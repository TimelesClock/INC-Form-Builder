import { api } from '~/utils/api';
import { useState, useEffect } from 'react';
import TemplateModal from './TemplateModal';

import type { FormTemplate } from '@prisma/client';

const FormCreationSection = () => {
  const utils = api.useUtils()
  const { mutate: createForm } = api.form.createForm.useMutation();
  const { data: template } = api.template.getTemplates.useQuery({});

  const [open, setOpen] = useState(false);
  const [templates, setTemplates] = useState<FormTemplate[]>([])

  useEffect(() => {
    if (template) {
      setTemplates(template);
    }
  }, [template])

  const handleCreateForm = () => {
    createForm({ name: "New Form", description: "New Form Description" },
      {
        onSuccess: async() => {
          await utils.form.getForms.refetch()
        }
      });

  }

  return (
    <>
      <TemplateModal open={open} setOpen={setOpen} templates={templates} />
      <div className="p-4 bg-white shadow-md">
        <button onClick={handleCreateForm} className="mr-2 bg-blue-500 text-white p-2 rounded">Create New Form</button>
        <button onClick={() => { setOpen(true) }} className="bg-green-500 text-white p-2 rounded">Use Template</button>
      </div>
    </>
  );
};

export default FormCreationSection;
