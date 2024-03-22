<div className="relative  add-report flex flex-col bg-white sm:w-full lg:w-[40%] shadow-2xl rounded-lg items-center lg:gap-5">
<div className="text-2xl font-bold text-black heading-container sm:pt-5">
  Add Report
</div>
<div className="type-container flex lg:flex-row lg:gap-5 sm:pt-5">
  <label htmlFor="type">Call Type:</label>
  <select
    name="type"
    className="border-[1px] border-black rounded-sm"
  >
    <option value={null}>None</option>
    <option value="studyCall">Study</option>
    <option value="followUpCall">FollowUp</option>
    <option value="casualCall">Casual</option>
  </select>
</div>
<div className="rea-res-container w-full flex flex-col lg:p-5">
  <div className="reason-container w-full flex sm:flex-col lg:flex-row sm:gap-2 lg:gap-0 p-2">
    <div className="reasontitle lg:w-[30%] sm:w-full  text-black text-xl font-Playfiar">
      Reason
    </div>
    <div className="reasoninput lg:w-[70%] sm:w-full">
      <textarea
        placeholder="Enter the reason..."
        className="p-2  w-full border-[1px] border-black"
      ></textarea>
    </div>
  </div>

  <div className="response-container w-full flex sm:flex-col lg:flex-row sm:gap-2 lg:gap-0 p-2">
    <div className="reposetitle lg:w-[30%] sm:w-full text-black text-xl font-Playfiar">
      Reponse
    </div>
    <div className="responseinput lg:w-[70%] sm:w-full">
      <textarea
        placeholder="Enter the response..."
        className="p-2  w-full border-[1px] border-black rounded-sm"
      ></textarea>
    </div>
  </div>
</div>
<div className="btncontainer flex w-full items-center justify-center pb-10">
  <button className="py-2 px-4 bg-custblue text-whitesmoke hover:text-white rounded-lg hover:shadow-xl shadow-black hover:scale-105 duration-150">
    Save Report
  </button>
</div>
</div>