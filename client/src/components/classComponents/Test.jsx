import React from "react";

const Test = () => {
  return (
    <div>
      <Button onClick={handleOpen}>
        {" "}
        <LuEye className="text-xl cursor-pointer" />
      </Button>
      <Dialog open={open}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Report
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <Typography color="red" variant="h4">
            ZA024 Fathima Hana
          </Typography>
          <Typography className="text-center font-normal">
            Classil Nalla urakkam aanu, Ottum sredhikunila!!
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="gradient" onClick={handleOpen}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Test;
