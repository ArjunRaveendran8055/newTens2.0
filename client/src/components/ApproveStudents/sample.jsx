import React from "react";

const sample = () => {
  return (
    <div>
      <select
        className="w-full h-10 relative flex px-4 py-2 border-gray-300 border-[1px] rounded-md focus:outline-2 focus:outline-gray-500 bg-white active:bg-red-300"
        name="class"
        value={formData.class + ""}
        onChange={(e) =>
          handleInputChange({
            target: { name: "class", value: parseInt(e) },
          })
        }
      >
        <option
          className="w-full flex "
          value={formData.class}
        >{`Class ${formData.class}`}</option>
        {classList
          ?.filter((item) => parseInt(item.cls) != parseInt(formData.class))
          .map((item, key) => (
            <option
              className="bg-white w-full flex absolute right-5"
              key={key}
              value={item.cls + ""}
            >
              {console.log("checking items are:", formData.class, item.cls)}
              {item.txt}
            </option>
          ))}
      </select>
      <button className="w-full h-10 rounded-md border-[1px] border-gray-500"></button>
    </div>
  );
};

export default sample;
