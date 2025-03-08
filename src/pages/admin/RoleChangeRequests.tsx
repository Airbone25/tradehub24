import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { toast } from 'react-toastify';

interface RoleChangeRequest {
  id: string;
  user_id: string;
  current_role: string;
  requested_role: string;
  status: string;
  created_at: string;
  user_email?: string;
  user_name?: string;
}

export const RoleChangeRequests: React.FC = () => {
  const [requests, setRequests] = useState<RoleChangeRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('role_change_requests')
        .select(`
          *,
          profiles:user_id (
            email,
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedRequests = data.map(request => ({
        ...request,
        user_email: request.profiles?.email,
        user_name: `${request.profiles?.first_name || ''} ${request.profiles?.last_name || ''}`.trim(),
      }));

      setRequests(formattedRequests);
    } catch (error: any) {
      toast.error('Error loading requests: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (requestId: string, approved: boolean) => {
    try {
      const request = requests.find(r => r.id === requestId);
      if (!request) return;

      // Start a transaction
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      // Update request status
      const { error: updateError } = await supabase
        .from('role_change_requests')
        .update({
          status: approved ? 'approved' : 'rejected',
          processed_at: new Date().toISOString(),
          processed_by: user?.id,
        })
        .eq('id', requestId);

      if (updateError) throw updateError;

      if (approved) {
        // Update user metadata
        const { error: authError } = await supabase.auth.admin.updateUserById(
          request.user_id,
          { user_metadata: { user_type: request.requested_role } }
        );
        if (authError) throw authError;

        // Update profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ user_type: request.requested_role })
          .eq('id', request.user_id);

        if (profileError) throw profileError;
      }

      toast.success(`Request ${approved ? 'approved' : 'rejected'} successfully`);
      loadRequests();
    } catch (error: any) {
      toast.error('Error processing request: ' + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Role Change Requests</h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {requests.map((request) => (
            <li key={request.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {request.user_name || 'Unknown User'}
                  </span>
                  <span className="text-sm text-gray-500">{request.user_email}</span>
                  <span className="text-xs text-gray-500">
                    Requested on {new Date(request.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-500">
                    {request.current_role} → {request.requested_role}
                  </span>
                  {request.status === 'pending' ? (
                    <div className="mt-2 flex space-x-2">
                      <button
                        onClick={() => handleRequestAction(request.id, true)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRequestAction(request.id, false)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className={`text-sm ${
                      request.status === 'approved' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
          {requests.length === 0 && (
            <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
              No role change requests found
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
