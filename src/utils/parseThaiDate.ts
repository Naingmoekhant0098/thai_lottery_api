export const parseThaiDate = (thaiDateStr: string) => {
  const months: { [key: string]: number } = {
    มกราคม: 0,
    กุมภาพันธ์: 1,
    มีนาคม: 2,
    เมษายน: 3,
    พฤษภาคม: 4,
    มิถุนายน: 5,
    กรกฎาคม: 6,
    สิงหาคม: 7,
    กันยายน: 8,
    ตุลาคม: 9,
    พฤศจิกายน: 10,
    ธันวาคม: 11,
  };

  const parts: any = thaiDateStr.split(" "); // [16, พฤษภาคม, 2569]
  const day = parseInt(parts[0]);
  const month: any = months[parts[1]];
  const year = parseInt(parts[2]) - 543; // Buddhist Era ကို AD သို့ ပြောင်းခြင်း

  return new Date(year, month, day, 15, 30); // ထိုင်းထီထွက်ချိန် ညနေ ၃:၃၀ အဖြစ် သတ်မှတ်
};
