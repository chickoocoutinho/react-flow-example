import Flow from "../components/Flow/Flow";
import { FlowContextProvider } from "../context/FlowContext/FlowContext";

// All Builder logic is present in FlowContextProvider
// This allows use to reuse/create multiple Builder components by wrapping it in a FlowContextProvider

const ChatFlowBuilder = () => {
	return (
		<FlowContextProvider>
			<Flow />
		</FlowContextProvider>
	);
};

export default ChatFlowBuilder;
