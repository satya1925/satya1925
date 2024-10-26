const express = require('express');
const bodyParser = require('body-parser');
const xlsx = require('xlsx');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

// Load or create the Excel file
const filePath = './data.xlsx';

function loadOrCreateWorkbook() {
    if (fs.existsSync(filePath)) {
        return xlsx.readFile(filePath);
    } else {
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.aoa_to_sheet([['Name', 'Email']]);
        xlsx.utils.book_append_sheet(wb, ws, 'Data');
        xlsx.writeFile(wb, filePath);
        return wb;
    }
}

app.post('/add-data', (req, res) => {
    const { name, email } = req.body;
    const workbook = loadOrCreateWorkbook();
    const worksheet = workbook.Sheets['Data'];

    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    data.push([name, email]);

    const newWorksheet = xlsx.utils.aoa_to_sheet(data);
    workbook.Sheets['Data'] = newWorksheet;

    xlsx.writeFile(workbook, filePath);
    res.json({ message: 'Data saved successfully!' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
