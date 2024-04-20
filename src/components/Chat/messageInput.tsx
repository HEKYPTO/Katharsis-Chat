import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function MessageInput() {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center items-end pb-8">
      <div className="w-full max-w-md flex items-center ml-2">
        <label className="sr-only">Message</label>
        <input
          type="message"
          name="message"
          id="message"
          className="flex-1 block rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          placeholder="Type your message here..."
        />
        <button type="button" className="mx-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white p-2">
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
