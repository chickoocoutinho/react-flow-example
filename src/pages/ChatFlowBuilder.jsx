import Flow from "../components/Flow/Flow";
import { FlowContextProvider } from "../context/FlowContext/FlowContext";
import { getSavedData } from "../service/browser/storage";

// All Builder logic is present in FlowContextProvider
// This allows use to reuse/create multiple Builder components by wrapping it in a FlowContextProvider

const ChatFlowBuilder = () => {
	const savedData = getSavedData();

	return (
		<FlowContextProvider defaultData={savedData}>
			<Flow />
		</FlowContextProvider>
	);
};

export default ChatFlowBuilder;
