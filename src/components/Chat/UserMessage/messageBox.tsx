
interface MessageBoxProps {
    username: string,
    datetime: string,
    message: string
  }

export default function MessageBox(props: MessageBoxProps) {

    const name = props.username ? props.username.toString() : '';
    const initials = name ? name.charAt(0).toUpperCase() : '';
    const time = props.datetime || '';
    const message = props.message ? props.message.toString() : '';

    return (
        <div>
            <div className="flex mb-4">
                <span className="flex flex-shrink-0 h-10 w-10 items-center justify-center rounded-lg border font-medium bg-white text-gray-400 border-gray-200">
                    {initials}
                </span>
                <div className="ml-2">
                    <span className="font-bold mr-2">{name}</span>
                    <span>{time}</span>
                    <div className="mt-1 px-4 py-2 bg-gray-100 rounded-lg mr-4">
                        <pre className="whitespace-pre-wrap">{message}</pre>
                    </div>
                </div>
            </div>

        </div>
    );
}