
interface EditSectionDropdownProps {
    type: string;
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const EditSectionDropdown: React.FC<EditSectionDropdownProps> = ({
    type,
    handleChange,
}) => {
    return (
        <div>
            <div className="flex items-center">
                <select defaultValue={type} onChange={handleChange}>
                    <option value="SHORT_ANSWER">Short Answer</option>
                    <option value="PARAGRAPH">Paragraph</option>
                    <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                    <option value="CHECKBOXES">Checkboxes</option>
                    <option value="DROPDOWN">Dropdown</option>
                </select>
            </div>
        </div>
    )
}

export default EditSectionDropdown