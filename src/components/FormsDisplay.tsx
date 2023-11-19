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
}

const FormsDisplay = ({ forms }: FormsDisplayProps) => {
    const router = useRouter();
    const [openDeleteChartModal, setOpenDeleteChartModal] = useState(false);
    const [currentFormId, setCurrentFormId] = useState("");

    return (
        <>
            <DeleteFormModal deleteModal={openDeleteChartModal} setDeleteModal={setOpenDeleteChartModal} formId={currentFormId} />
            <div className="grid grid-cols-3 gap-4 p-4">
                {forms.map((form, index) => (
                    <button className="relative" key={index} onClick={() => { void router.push(`/form/${form.id}`) }}>
                        <div key={index} className="p-4 border border-gray-300 rounded">
                            <h3 className="text-lg font-semibold">{form.title}</h3>
                        </div>
                        <button
                            className="opacity-1 absolute right-3 top-4 z-50 group-hover:opacity-100"
                            onClick={(event) => {
                                event.stopPropagation();
                                setOpenDeleteChartModal(true);
                                setCurrentFormId(form.id);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                            </svg>
                        </button>
                    </button>
                ))}
            </div>
        </>
    );
};

export default FormsDisplay;
