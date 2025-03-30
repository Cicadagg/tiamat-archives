import React from 'react';
import { useQueryClient } from 'react-query';
import { BingoInterface } from '../../store/reducers/bingo-reducer';

export const BingoGame = () => {
    const [selectedColor, setSelectedColor] = React.useState<string | null>(null);
    const [bingoGrid, setBingoGrid] = React.useState<string[]>(Array(16).fill(''));
    const [squareTexts, setSquareTexts] = React.useState<string[]>(Array(16).fill('')); // Массив для текста внутри квадратов

    // Получение данных о бинго из кеша
    const queryClient = useQueryClient();
    const bingos = queryClient.getQueryData('bingo') as BingoInterface[];

    // Обработчик клика по квадрату Bingo
    const handleSquareClick = (index: number) => {
        if (!selectedColor) return;

        setBingoGrid(prev => {
            const newGrid = [...prev];
            const currentColor = newGrid[index];

            if (!currentColor) {
                // Если клетка пуста, установить выбранный цвет
                newGrid[index] = selectedColor;
            } else if (currentColor === selectedColor) {
                // Если цвет совпадает, очистить клетку
                newGrid[index] = '';
            } else if (currentColor.includes(',')) {
                // Если клетка разделена на два цвета
                const colors = currentColor.split(',');
                if (colors.includes(selectedColor)) {
                    // Если выбранный цвет присутствует, удалить его
                    newGrid[index] = colors.filter(color => color !== selectedColor).join(',');
                    // Если после удаления остался один цвет, оставить его как одиночный
                    if (newGrid[index].includes(',')) {
                        newGrid[index] = newGrid[index];
                    } else {
                        newGrid[index] = newGrid[index] || '';
                    }
                } else {
                    // Если выбранный цвет не присутствует, добавить его как третий цвет (не реализовано, так как это не описано в задаче)
                    console.log('Добавление третьего цвета не реализовано');
                }
            } else {
                // Если цвет другой, разделить цвет 50 на 50
                newGrid[index] = `${currentColor},${selectedColor}`;
            }

            return newGrid;
        });
    };

    // Обработчик нажатия кнопки "refresh"
    const handleRefreshClick = () => {
        const availableNames = bingos.map((bingo, index) => bingo?.name || `Square ${index + 1}`);
        
        // Создаем копию массива, чтобы не изменять исходный
        const shuffledNames = [...availableNames];
        
        // Перемешиваем массив
        for (let i = shuffledNames.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledNames[i], shuffledNames[j]] = [shuffledNames[j], shuffledNames[i]];
        }
        
        // Выбираем первые 16 элементов (или меньше, если элементов меньше 16)
        const newSquareTexts = shuffledNames.slice(0, 16);
        
        // Если элементов меньше 16, дополняем до 16 по умолчанию
        if (newSquareTexts.length < 16) {
            for (let i = newSquareTexts.length; i < 16; i++) {
                newSquareTexts.push(`Square ${i + 1}`);
            }
        }
        
        setSquareTexts(newSquareTexts);
    };

    // Получение стиля для квадрата
    const getSquareStyle = (index: number) => {
        const square = bingoGrid[index];
        if (square.includes(',')) {
            // Если цвет разделён, применить градиент
            const colors = square.split(',');
            if (colors.length === 2) {
                // Разделить по диагонали, желтый всегда внизу
                const yellowColor = '#f7dc6f';
                const topColor = colors.includes(yellowColor) ? colors.filter(color => color !== yellowColor)[0] : colors[0];
                const bottomColor = yellowColor;
                return {
                    background: `linear-gradient(to bottom left, ${topColor} 50%, ${bottomColor} 50%)`
                };
            } else if (colors.length === 1) {
                return { backgroundColor: colors[0] || 'transparent' };
            } else {
                // Если больше двух цветов, не реализовано
                console.log('Больше двух цветов не реализовано');
                return { backgroundColor: 'transparent' };
            }
        } else {
            return { backgroundColor: square || '#ccc' }; // Стандартный серый цвет
        }
    };


    return (
        <div className="bingo-container">
            <h2>Bingo Game</h2>
            <div className="color-selector">
                <button 
                    className={`color-button yellow ${selectedColor === '#f7dc6f' ? 'selected' : ''}`}
                    onClick={() => setSelectedColor('#f7dc6f')}
                >
                    yellow
                </button>
                <button 
                    className={`color-button purple ${selectedColor === '#7a288a' ? 'selected' : ''}`}
                    onClick={() => setSelectedColor('#7a288a')}
                >
                    purple
                </button>
                <button 
                    className="refresh-button"
                    onClick={handleRefreshClick}
                >
                    <span className="refreshtext">Refresh</span>
                </button>
            </div>
            
            <div className="bingo-grid">
                {Array(16).fill(0).map((_, index) => (
                    <div 
                        key={index}
                        className="bingo-square"
                        onClick={() => handleSquareClick(index)}
                        style={getSquareStyle(index)}
                    >
                        <span className="bingo-square-text">{squareTexts[index]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
