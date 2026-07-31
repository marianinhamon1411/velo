export function generateOrderCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'VLO-';
  
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return code;
  }
  
  const order = generateOrderCode();
  
  console.log(order); // Exemplo: VLO-5SFLHW
