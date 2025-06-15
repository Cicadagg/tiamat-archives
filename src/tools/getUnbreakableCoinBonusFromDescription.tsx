export const getUnbreakableCoinBonusFromDescription = (descriptions:string, countCoin:number) : boolean[] => {
  const unbreakableCoinBuff = new Array(countCoin).fill(false); // Инициализируем массив

  const regex = /@(\d+)@\s*#unbreakableCoin#/g; // Регулярное выражение для поиска всех вхождений
  const matches = Array.from(descriptions.matchAll(regex)); // Преобразуем итератор в массив

  for (const match of matches) {
    const index = parseInt(match[1], 10); // Извлекаем значение @x@
    
    // Проверяем, что индекс валиден
    if (index >= 0 && index-1 < countCoin) {
      unbreakableCoinBuff[index-1] = true; // Устанавливаем значение true в нужную ячейку
    }
  }

  return unbreakableCoinBuff;
}