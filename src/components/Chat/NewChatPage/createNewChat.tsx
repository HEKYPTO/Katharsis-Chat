
import UserIcon from '@/components/Misc/UserIcon';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import { UserPlusIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

const team = [
  {
    name: 'Leslie Alexander',
    status: 'online',
  },
  {
    name: 'Yves Laroche',
    status: 'online',
  },
  {
    name: 'Abdulaziz Ibn Saud',
    status: 'online',
  },
  // More people...
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function NewChatPage() {
  const [chatType, setChatType] = useState('');

  return (
    <form className='mt-20 mb-20 mx-16'>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
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
                    name="username"
                    id="username"
                    autoComplete="username"
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
                  <option value="" disabled selected hidden>Select your option</option>
                  <option value="public">Private</option>
                  <option value="private">Public (Open Chat)</option>
                </select>
              </div>

              <div className="col-span-full mt-8">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  Add Member
                </label>
                <div className="flex items-center mt-2">
                  <label className="sr-only">Message</label>
                  <input
                    type="user"
                    name="username"
                    id="username"
                    className="bg-transparent ring-1 ring-inset ring-gray-300 py-1.5 px-4 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none rounded-md"
                    placeholder="Find or Add Member"
                  />
                  <button type="button" className="ml-2 mr-5 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white p-2">
                    <UserPlusIcon className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-3 text-sm leading-6 text-red-400">* The previous user could not be found.</p>
                <p className="mt-3 text-sm leading-6 text-red-400">* This user is previously added.</p>
              </div>
              
              <div className="mt-1 px-4 py-2 bg-gray-100 rounded-lg mr-4 min-h-200 flex-shrink-0 w-[24rem] overflow-x-auto">
                <pre className="whitespace-pre-wrap">
                  <ul role="list" className="flex-1 divide-y divide-gray-200">
                    {team.map((person) => (
                      <li key={person.name}>
                        <div className="group relative flex items-center px-5 py-6">
                          <div className="absolute inset-0 group-hover:bg-gray-50" aria-hidden="true" />
                          <div className="relative flex min-w-0 flex-1 items-center">
                            <button type="button" className="mr-4 bg-red-400 hover:bg-red-500 rounded-full text-white p-1">
                              <MinusCircleIcon className="h-5 w-5" />
                            </button>
                            <span className="relative inline-block flex-shrink-0">
                              <UserIcon name={person.name}/>
                              <span
                                className={classNames(
                                  person.status === 'online' ? 'bg-green-400' : 'bg-gray-300',
                                  'absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white'
                                )}
                                aria-hidden="true"
                              />
                            </span>
                            <div className="ml-4 overflow-x-hidden"> 
                              <p className="text-sm text-gray-900 overflow-x-auto">
                                {person.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </pre>
              </div>

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
