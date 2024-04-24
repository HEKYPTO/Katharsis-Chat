
import UserIcon from '@/components/Misc/UserIcon';
import { getAllFriends, createRoom, getUsername } from '@/lib/axios';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import { UserPlusIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

interface ChatProps {
  closeFunction: () => void;
  activate: () => void;
}

export default function NewChatPage({ closeFunction, activate }: ChatProps) {
  const [chatType, setChatType] = useState<MessageType>("Direct");
  const [groupName, setGroupName] = useState<string>('');
  const [members, setMembers] = useState<string[]>([]);
  const [friends, setFriends] = useState<string[]>([]);
  const [err, setErr] = useState<string | null>("");
  const [username, setUsername] = useState<string>('');

  const handleAddMember = (name: string): void => {

    //console.log(friends);
    //console.log(members); // rm later

    setErr("");

    if (name === getUsername()) {
      setErr("* You will become a member of the group if you created the group.");
      return;
    }

    if (!friends.includes(name)) {
      setErr("* Unknown member given.");
      return;
    }

    if (members.includes(name)) {
      setErr("* Duplicate member given.");
      return;
    }

    setMembers([...members, name]);
    setUsername('');
  };

  const handleRemoveMember = (name: string): void => {
    setMembers(members.filter(member => member !== name));
  };

  useEffect(() => {
    const fetchFriends = async (): Promise<void> => {
      try {
        const fetchedFriendsResponse = await getAllFriends();
        const fetchedFriends: string[] = fetchedFriendsResponse.friends || [];
        
        const uniqueFriends: string[] = fetchedFriends.filter((friend: string, index: number, self: string[]) => self.indexOf(friend) === index);

        setFriends(uniqueFriends);
  
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };
  
    fetchFriends();
  
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    setErr("");
    event.preventDefault();

    try {
      if (!groupName || !chatType || members.length === 0) {
        setErr('* Please fill in all required fields.');
        return;
      }

      const concatMem: string = members.join(",");

      console.log(concatMem)

      const createdRoom = await createRoom(groupName, chatType, concatMem);
      console.log('New group created:', createdRoom);

      setGroupName('');
      setChatType('Direct');
      setMembers([]);

      closeFunction();
      activate();
    } catch (error) {
      console.error('Error creating new group:', error);
    }
  };

  return (
    <form className='mt-20 mb-20 mx-16' onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-20">
          <h2 className="text-base font-semibold leading-7 text-gray-900">New Group Chat</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Group Chat Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 px-3 ring-inset ring-gray-300 focus:outline-none sm:max-w-md">
                  <input
                    type="text"
                    name="groupname"
                    id="groupname"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    required
                    className="block flex-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none"
                    placeholder="Chat name here!"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="chat" className="block text-sm font-medium leading-6 text-gray-900">
                Chat Type
              </label>
              <div className="mt-2">
              <select
                  id="chat"
                  name="chattype"
                  value={chatType}
                  onChange={(e) => setChatType(e.target.value)}
                  className={`w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:max-w-xs sm:text-sm sm:leading-6 ${chatType === '' ? 'text-gray-400' : 'text-gray-900 '}`}
                >
                  <option value="" disabled hidden>Select your option</option>
                  <option value="PrivateGroup">Private</option>
                  <option value="PublicGroup">Public (Open Chat)</option>
                </select>
              </div>

              <div className="col-span-full mt-8">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  Add Member
                </label>
                <div className="flex items-center mt-2">
                  <label className="sr-only">Message</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-transparent ring-1 ring-inset ring-gray-300 py-1.5 px-4 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none rounded-md"
                    placeholder="Find or Add Member"
                  />
                  <button type="button" onClick={() => handleAddMember(username)} className="ml-2 mr-5 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white p-2">
                    <UserPlusIcon className="h-5 w-5" />
                  </button>
                </div>
                {err !== "" && (
                  <p className="mt-2 text-sm leading-6 text-red-400">{err}</p>
                )}
              </div>
              
              {members.length > 0 && (
              <div className="mt-4 px-4 py-2 bg-gray-100 rounded-lg mr-4 min-h-200 min-w-[16rem] max-w-[28rem] overflow-x-auto">
                <pre className="whitespace-pre-wrap">

                    <ul role="list" className="flex-1 divide-y divide-gray-200">
                    {members.map((person) => (
                      <li key={person}>
                        <div className="group relative flex items-center px-5 py-6">
                          <div className="absolute inset-0 group-hover:bg-gray-50" aria-hidden="true" />
                          <div className="relative flex min-w-0 flex-1 items-center">
                            <button type="button" onClick={() => handleRemoveMember(person)} className="mr-4 bg-red-400 hover:bg-red-500 rounded-full text-white p-1">
                              <MinusCircleIcon className="h-5 w-5" />
                            </button>
                            <span className="relative inline-block flex-shrink-0">
                              <UserIcon name={person}/>
                            </span>
                            <div className="ml-4"> 
                              <p className="text-sm text-gray-900">
                                {person}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </pre>
              </div>
              )}

            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}