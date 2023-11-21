import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import type { FormTemplate } from '@prisma/client';
import { api } from '~/utils/api';

interface TemplateModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    templates: FormTemplate[];
}

const TemplateModal: React.FC<TemplateModalProps> = ({ open, setOpen, templates }) => {
    const cancelButtonRef = useRef(null);
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    const { mutate: createForm } = api.form.createFormWithTemplate.useMutation();

    const util = api.useUtils();

    const handleSelectTemplate = (templateId: string) => {
        setSelectedTemplate(templateId);
    };

    const handleCreateForm = () => {
        setOpen(false);
        createForm({ templateId: selectedTemplate! },
            {
                onSuccess: () => {
                    void util.form.getForms.refetch();
                }
            });
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
                                    {templates.map((template) => (
                                        <div
                                            key={template.id}
                                            className={`border p-5 my-2 cursor-pointer ${selectedTemplate === template.id ? 'border-indigo-500' : 'border-gray-300'}`}
                                            onClick={() => handleSelectTemplate(template.id)}
                                        >
                                            <h3 className="text-lg font-semibold">{template.name}</h3>
                                            <p className="text-sm text-gray-500">{template.description}</p>
                                        </div>
                                    ))}
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
                                        onClick={handleCreateForm}
                                        ref={cancelButtonRef}
                                    >
                                        Create Form
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

export default TemplateModal;
