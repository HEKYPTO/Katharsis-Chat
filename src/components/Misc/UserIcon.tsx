interface UserIconProps {
    name: string
  }

export default function UserIcon(props: UserIconProps) {

    const { name } = props;
    const initials = name.charAt(0).toUpperCase();

    return (
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border font-medium bg-white text-gray-400 border-gray-200">
        {initials}
        </span>
    );
}