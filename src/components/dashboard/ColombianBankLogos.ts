// Colombian bank logos with their URLs
export const colombianBankLogos = {
  bancolombia:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Bancolombia_logo.svg/320px-Bancolombia_logo.svg.png",
  davivienda:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Davivienda_logo.svg/320px-Davivienda_logo.svg.png",
  bbva: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/BBVA_logo.svg/320px-BBVA_logo.svg.png",
  bancodebogota:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Banco_de_Bogot%C3%A1_logo.svg/320px-Banco_de_Bogot%C3%A1_logo.svg.png",
  bancodeoccidente:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Banco_de_Occidente_logo.svg/320px-Banco_de_Occidente_logo.svg.png",
  colpatria:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Scotiabank_Colpatria_logo.svg/320px-Scotiabank_Colpatria_logo.svg.png",
  avvillas:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/AV_Villas_logo.svg/320px-AV_Villas_logo.svg.png",
  bancopopular:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Banco_Popular_Colombia_logo.svg/320px-Banco_Popular_Colombia_logo.svg.png",
  bancagrario:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Banco_Agrario_de_Colombia_logo.svg/320px-Banco_Agrario_de_Colombia_logo.svg.png",
  bancamia:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bancam%C3%ADa_logo.svg/320px-Bancam%C3%ADa_logo.svg.png",
};

// Function to get a bank logo by name
export const getBankLogo = (bankName: string): string => {
  const normalizedName = bankName.toLowerCase().replace(/\s+/g, "");
  return (
    colombianBankLogos[normalizedName as keyof typeof colombianBankLogos] ||
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Bancolombia_logo.svg/320px-Bancolombia_logo.svg.png"
  );
};
