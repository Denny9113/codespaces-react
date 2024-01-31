import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, toggleValue, addLabel, handleCheckboxChange } from "../../2.ReduxToolkit/Slice";

export default function MoreOption() {

    const [editlable, SetEditlable] = useState(false)
    const [lableValue, SetLableValue] = useState('')
    const dispatch = useDispatch()
    const idForNote = useSelector((state => state.clickToShow.id))
    const toggleValue0 = useSelector((state) => state.clickToShow.toggleValue);
    const labelArry = useSelector((state) => state.clickToShow.label);


    const deleteBtn = () => {
        dispatch(deleteNote(idForNote))
        dispatch(toggleValue(false))
    }

    const lableBtn = () => {
        editlable ? SetEditlable(false) : SetEditlable(true)

    }

    const addLabelLocal = (e) => {
        if (lableValue && !labelArry.some((each) => each.name === lableValue)) {
            const labelID = labelArry.length + 1
            dispatch(addLabel({
                id: labelID,
                name: lableValue,
                isChecked: false
            }))
            SetLableValue('')
        }
        if (labelArry.some((each) => each.name === lableValue)) alert(`"${lableValue}" label is already exist.`)
        // const cheked = labelArry.filter((each) => each.isChecked === true)
        // console.log(cheked);
    }

    return (
        <div className="absolute transition-all z-40 w-fit shadow-md">

            <ul className="border  text-left  rounded bg-white ">
                {!editlable ? (
                    <li
                        className={` mt-1 py-2 px-4 hover:bg-gray-100 text-gray-900 leading-tight tracking-tight transition-all cursor-pointer`}
                        onClick={() => deleteBtn()}
                    >
                        Delete note
                    </li>) : null}
                <li
                    className={` py-2 px-4 ${!editlable ? 'hover:bg-gray-100' : null}  text-gray-900 leading-tight tracking-tight transition-all cursor-pointer`}
                    onClick={() => !editlable ? SetEditlable(true) : null}
                >
                    <div className="flex justify-between">
                        <div
                            onClick={() => lableBtn()}
                            className={``}>Add label
                        </div>
                        <button
                            onClick={() => lableBtn()}
                            className={`${!editlable ? 'hidden' : 'block'} px-2`}
                        >
                            &#10005;
                        </button>
                    </div>
                    {editlable ? (
                        <div>
                            <div className="flex mt-2 ">
                                <input
                                    type="text"
                                    value={lableValue}
                                    onKeyUp={(e) => e.key === 'Enter' ? addLabelLocal() : null}
                                    onChange={(e) => SetLableValue(e.target.value)}
                                    placeholder="Enter label name"
                                    className="outline-none bg-transparent text-gray-700" />

                                <button
                                    onClick={() => addLabelLocal()}
                                    className="ml-4 mr-0 px-2"
                                >
                                    &#10003;
                                </button>
                            </div>
                            <div className="flex flex-col items-start mt-1">
                                {labelArry.map((each, index) => {
                                    if (each.name) {
                                        return (<li key={each.id}>
                                            <label htmlFor={each.id}
                                                className=" text-[0.9rem] mb-1 cursor-pointer "
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={each.id}
                                                    value={each.name}
                                                    checked={each.isChecked}
                                                    onChange={() => dispatch(handleCheckboxChange(each.id))}
                                                    className="mr-2 accent-gray-500" />
                                                {each.name}
                                            </label>
                                        </li>)
                                    }
                                })}

                            </div>
                        </div>
                    ) : null}
                </li>
                {!editlable ? (
                    <li
                        className=" mb-1 py-2 px-4 hover:bg-gray-100  text-gray-900 leading-tight tracking-tight transition-all">
                        Make a copy
                    </li>
                ) : null}

            </ul>
        </div >
    )
}
