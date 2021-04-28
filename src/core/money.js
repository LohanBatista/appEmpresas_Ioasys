export const reais = (amount) => {
  if (amount !== null && amount !== undefined) {
    // if (amount === 0) {
    //   return 'Grátis';
    // }

    return `R$ ${amount
      .toFixed(2)
      .replace('.', ',')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  }

  return '';
};
