
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
            <div className="flex">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border font-medium bg-white text-gray-400 border-gray-200">
                    {initials}
                </span>
                <div className="ml-3">
                    <span className="font-bold mx-2">{name}</span>
                    <span>{time}</span>
                </div>
            </div>
            <div className="mt-2 px-4 py-2 bg-gray-100 rounded-lg">
                <pre className="whitespace-pre-wrap">{message}</pre>
            </div>
        </div>
    );
}