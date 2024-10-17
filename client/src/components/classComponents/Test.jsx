export function FileUpload({ setExceldata }) {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        if (json.length > 0) {
          const headers = json[0];
          //console.log("headers:", headers);
          const expectedHeaders = [
            "studentName",
            "roll",
            "duration",
            "joinTime",
          ];
          const isValid =
            headers.length === expectedHeaders.length &&
            headers.every((header, index) => header === expectedHeaders[index]);

          if (!isValid) {
            window.alert(
              "Error: Excel file must only contain the headings 'roll', 'duration', and 'joinTime'."
            );
            return;
          }

          const jsonData = json
            .slice(1)
            .map((row) => {
              let obj = {};
              row.forEach((cell, index) => {
                obj[headers[index]] = cell;
              });
              return obj;
            })
            .filter(
              (obj) =>
                Object.keys(obj).length > 0 && !obj.hasOwnProperty(undefined)
            );
          setExceldata(jsonData);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          multiple
          accept=".xlsx, .xls"
        />
      </Button>
    </>
  );
}