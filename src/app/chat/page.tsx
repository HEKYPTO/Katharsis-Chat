import ChatPane from "@/components/Chat/appShell";
import ProtectedRoute from "@/utils/protectedRoute";

export default function chatPage() {
    return (
        <ProtectedRoute>
            <ChatPane />
        </ProtectedRoute>
    );
}