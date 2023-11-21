import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { api } from '~/utils/api';
import { useRouter } from 'next/router';


import { toast } from 'react-hot-toast';

interface InviteModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;

}

const InviteModal: React.FC<InviteModalProps> = ({ open, setOpen }) => {
    const router = useRouter()
    const cancelButtonRef = useRef(null);

    const { mutate: addInvitation } = api.form.sendInvitation.useMutation()

    // const { data: userData } = api.form.getInvitations.useQuery({ id: router.query.formId as string }, { enabled: !!router.query.formId })

    // const [users, setUsers] = useState<string[]>([]);

    // useEffect(() => {
    //     if (userData) {
    //         //set users to the list of emails
    //         setUsers([])
    //         userData.forEach((user: User) => {

    //             setUsers([...users, user.email as string])
    //         })
    //     }
    // }, [userData])

    // const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === "Enter") {
    //         //check if email valid
    //         if (!event.currentTarget.value.includes("@")) {
    //             event.currentTarget.value = ""
    //             return
    //         }
    //         //check if the email is in the list of users
    //         if (!users.includes(event.currentTarget.value)) {
    //             setUsers([...users, event.currentTarget.value])
    //         }



    //     }
    // }

    const handleSendInvitation = () => {
        //send invitation to the user specified in the input
        //check if email valid
        const email = (document.getElementById("email") as HTMLInputElement).value
        if (!email.includes("@")) {
            return
        }
        //send
        addInvitation({ email: email, id: router.query.formId as string }, {
            onSuccess: () => {
                setOpen(false)
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })


    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => setOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div className="overflow-y-auto max-h-96">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                        Invite people
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Invite people to fill out this form
                                        </p>
                                    </div>
                                    <div className="mt-5">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email address
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder=""

                                            />
                                        </div>
                                        {/* {users?.map((user, index) => {
                                            return (
                                                <div key={index} className="mt-1 bg-slate-100">
                                                    <p>{user}</p>
                                                </div>
                                            )
                                        })} */}
                                    </div>

                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                        onClick={handleSendInvitation}
                                        ref={cancelButtonRef}
                                    >
                                        Send Invite
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default InviteModal;
