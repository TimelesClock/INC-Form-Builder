import { useRouter } from "next/router";
import { useState } from "react";

import DeleteFormModal from "./DeleteFormModal";
interface Form {
    id: string;
    title: string;
    // Add more form details here
}

interface FormsDisplayProps {
    forms: Form[];
    invitedForms: Form[];
}

const FormsDisplay = ({ forms,invitedForms }: FormsDisplayProps) => {
    const router = useRouter();
    const [openDeleteChartModal, setOpenDeleteChartModal] = useState(false);
    const [currentFormId, setCurrentFormId] = useState("");

    return (
        <>
            <DeleteFormModal deleteModal={openDeleteChartModal} setDeleteModal={setOpenDeleteChartModal} formId={currentFormId} />
            <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900">Your forms</h2>
            <div className="grid grid-cols-3 gap-4 p-4">
                {forms.map((form, index) => (
                    <div className="border border-gray-300 rounded-xl flex justify-between hover:bg-slate-100 cursor-pointer" key={index} onClick={() => {}}>
                        <div key={index} className="p-4">
                            <h3 className="text-lg font-semibold">{form.title}</h3>
                        </div>

                        <div className="flex flex-row space-x-5 mt-4 me-5">
                            <svg onClick={async(event) => {
                                event.stopPropagation();
                                await router.push('/edit/' + form.id)
                            }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 hover:bg-slate-200 rounded-xl">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-7 w-7 hover:bg-slate-200 rounded-xl"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setOpenDeleteChartModal(true);
                                    setCurrentFormId(form.id);
                                }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900">Forms you are invited to</h2>
            <div className="grid grid-cols-3 gap-4 p-4">
                {invitedForms.map((form, index) => (
                    <div className="border border-gray-300 rounded-xl flex justify-between hover:bg-slate-100 cursor-pointer" key={index} onClick={() => { void router.push(`/form/${form.id}`) }}>
                        <div key={index} className="p-4">
                            <h3 className="text-lg font-semibold">{form.title}</h3>
                        </div>

                        
                    </div>
                ))}
            </div>
        </>
    );
};

export default FormsDisplay;
