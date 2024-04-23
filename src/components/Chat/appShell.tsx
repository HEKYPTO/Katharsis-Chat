"use client"

import { Fragment, useState, useEffect } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  Cog6ToothIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import MemberList from './memberBar'
import MessageInput from './messageInput'
import MessagePane from './messagePane'
import NewChatPage from './NewChatPage/createNewChat'
import UserIcon from '../Misc/UserIcon'
import { isLoggedIn, userLogout, getAllFriends, getAllPublicGroups, getAllPrivateGroups } from '@/lib/axios'
import { useRouter } from 'next/navigation';

const navigation: NavItem[] = [
  { name: 'Message', icon: HomeIcon },
  { name: 'Chat', icon: UsersIcon },
  { name: 'Global', icon: FolderIcon },
]

const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ChatPane() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [memberOpen, setMemberOpen] = useState(false)
  const [selectedNavItem, setSelectedNavItem] = useState(null)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [newChatOpen, setNewChatOpen] = useState(false)
  const [directMessage, setDirectMessage] = useState([]);
  const [privateGroup, setPrivateGroup] = useState<GroupRoom[]>([]);
  const [publicGroup, setPublicGroup] = useState<GroupRoom[]>([]);
  const [displayRoom, setDisplayRoom] = useState<GroupRoom[]>([]);
  const [login, setLogin] = useState(false);

  useEffect(() => {

    setLogin(isLoggedIn());
  }, []);
  

  const router = useRouter();

  const handleNavigationSelect = (item: NavItem) => {
    setSelectedNavItem(item);

    console.log(directMessage);
    console.log(privateGroup);
    console.log(publicGroup);

    setDisplayRoom([]);
    
    switch (item.name) {
        // case 'Message':
        //     setDisplayRoom(directMessage. || []);
        //     break;
        case 'Chat':
            setDisplayRoom(privateGroup || []);
            break;
        case 'Global':
            setDisplayRoom(publicGroup || []);
            break;
        default:
            setDisplayRoom([]); 
            break;
    }

    setNewChatOpen(false);
}

  const handleTeamSelect = (team: any) => {
    setSelectedTeam(team)
  }

  const handleNewChatOpen = () => {
    setSelectedNavItem(null)
    setNewChatOpen(true)
  }

  const handleSignout = async () => {
    try {
      await userLogout();
      router.push('/');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleViewProfile = async () => {

  };

  const userNavigation = [
    { name: 'Your profile', event: handleViewProfile },
    { name: 'Sign out', event: handleSignout },
  ]

  useEffect(() => {
    const fetchData = async () => {
        try {
            const directMessageData = await getAllFriends();
            setDirectMessage(directMessageData);

            const privateGroupData = await getAllPrivateGroups();
            setPrivateGroup(privateGroupData);

            const publicGroupData = await getAllPublicGroups();
            setPublicGroup(publicGroupData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

      fetchData();
  }, []);


  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <Image
                        className="h-8 w-auto"
                        src="/logo.svg"
                        alt="Your Company"
                        height={24}
                        width={24}
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={"#"}
                                  onClick={() => handleNavigationSelect(item)}
                                  className={classNames(
                                    selectedNavItem === item ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      selectedNavItem === item ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                      'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="">
                          <a
                            href="#"
                            onClick={() => handleNewChatOpen()}
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-white hover:bg-indigo-700 bg-indigo-600"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                              aria-hidden="true"
                            />
                            New Chat
                          </a>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">Your Chats</div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {displayRoom.map((room) => (
                              <li key={room._id}>
                                <a
                                  onClick={() => handleTeamSelect(room)}
                                  className={classNames(
                                    selectedTeam === room
                                      ? 'bg-gray-50 text-indigo-600'
                                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                <div className="flex justify-center items-center">
                                  <UserIcon name={room.name} />
                                  <span className="truncate ml-2">{room.name}</span>
                                </div>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <Image
                className="h-8 w-auto"
                src="/logo.svg"
                alt="Your Company"
                width={24}
                height={24}
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={"#"}
                          onClick={() => handleNavigationSelect(item)}
                          className={classNames(
                            selectedNavItem === item ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                        <item.icon
                          className={classNames(
                            selectedNavItem === item ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                            'h-6 w-6 shrink-0'
                          )}
                          aria-hidden="true"
                        />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="">
                  <a
                    href="#"
                    onClick={() => handleNewChatOpen()}
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-white hover:bg-indigo-700 bg-indigo-600"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                      aria-hidden="true"
                    />
                    New Chat
                  </a>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">Your Chats</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {displayRoom.map((room) => (
                      <li key={room._id}>
                        <a
                          href={'#'}
                          onClick={() => handleTeamSelect(room)}
                          className={classNames(
                            selectedTeam === room
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold overflow-x-auto whitespace-nowrap'
                          )}
                        >
                        <div className="flex justify-center items-center">
                          <UserIcon name={room.name} />
                          <span className="truncate ml-2">{room.name}</span>
                        </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

            <div className="flex justify-start items-center">
            <button
              className="block text-sm text-gray-700 rounded-full mr-1 hover:bg-gray-200 py-1 px-1"
              onClick={() => setMemberOpen(true)}
            >
              <UserCircleIcon className="h-6 w-6 text-gray-700" />
            </button>
              <span>Chat Name</span>
            </div>


            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
              <div className="flex items-center gap-x-4 lg:gap-x-6 right">

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="lg:flex lg:items-center">
                      <span className="ml-4 text-sm font-semibold leading-6 text-gray-900">
                        Tom Cook
                      </span>
                      <ChevronDownIcon className="hidden ml-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <button
                                onClick={item.event}
                                className={classNames(
                                    active ? 'bg-gray-50' : '',
                                    'flex justify-start items-center w-full py-2 px-3 text-sm text-gray-900'
                                )}
                            >
                                {item.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="">
            <div className="bg-white">
              {newChatOpen ? (
                <NewChatPage />
              ) : (
                <div>
                  <MemberList isOpen={memberOpen} closeMember={() => setMemberOpen(!memberOpen)} />
                  <MessageInput /> 
                  <MessagePane />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
