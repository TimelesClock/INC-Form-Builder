// components/FormsDisplay.tsx

import { useRouter } from "next/router";

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

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {forms.map((form, index) => (
                <button key={index} onClick={()=>{void router.push(`/form/${form.id}`)}}>
                    <div key={index} className="p-4 border border-gray-300 rounded">
                        <h3 className="text-lg font-semibold">{form.title}</h3>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default FormsDisplay;
