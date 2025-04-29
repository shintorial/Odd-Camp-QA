const { GoogleAuth } = require('google-auth-library');
const { sheets } = require('@googleapis/sheets');

export class GoogleSheet {
    SHEET_ID: string;
    auth: any;
    sheetsClient: any;

    constructor() {

        this.SHEET_ID = '164v9dcuZJpGGi-nnlbLY8F3-Hw93WU1hLn6FJdzHICk'; // ใส่ Google Sheet ID
        this.auth = new GoogleAuth({
            keyFile: 'phonic-adviser-458302-h2-07e2d5cca62e.json', // เปลี่ยนเป็นไฟล์ JSON ของคุณ
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        this.sheetsClient = sheets({ version: 'v4', auth: this.auth });
    }

    getThaiTime() {
        return new Intl.DateTimeFormat('th-TH', {
            timeZone: 'Asia/Bangkok',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(new Date());
    }

    async updateSheet(testName: string, status: string): Promise<void> {
        try {
            console.log('👉 Trying to update sheet with:', testName, status, this.getThaiTime());
            const response = await this.sheetsClient.spreadsheets.values.append({
                spreadsheetId: this.SHEET_ID,
                range: 'A:C',
                valueInputOption: 'RAW',
                insertDataOption: 'INSERT_ROWS',
                requestBody: {
                    values: [[testName, status, this.getThaiTime()]],
                },
            });
            console.log('✅ Successfully updated sheet:', response.status);
        } catch (error) {
            console.error('🔥 Error updating the Google Sheet:', error.response?.data || error.message || error);
        }
    }
}

