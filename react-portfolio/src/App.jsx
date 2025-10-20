import React from "react";
import { useState, useEffect, useContext, useRef, useMemo, useCallback, useReducer } from "react";

const ThemeContext = React.createContext();

function Hooks(){
    //состояние
    const [count, setCount] = useState(0);
    const [name, setName] = useState('Илюша');

    //обновление при условии
    useEffect(() => {
        console.log('Компонент обновился');
        document.title = `Счёт: ${count}`; //`` - для переменных в тексте (по аналогии с $ и f")
    }, [count]); //Эффект срабатывает при изменении count

    //Прямой доступ к DOM
    const inputRef = useRef(null);

    //Мемоизация сложных вычислений
    const expensiveValue = useMemo(() => {
        console.log('Вычисляю сложное значение...');
        return count * 1000;
    }, [count]); //Условие пересчёта

    //Мемоизация функций
    const handleClick = useCallback(() => {
        console.log(`Текущий счёт: ${count}`);
    }, [count]); //Новая функция создаётся при изменении count

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'increment':
                return {count: state.count + 1};
            case 'decrement':
                return {count: state.count - 1};
            default:
                return state;
        }
    }, {count: 0});

    const theme = useContext(ThemeContext);

    return(
        <div style={{ padding: '20px', backgroundColor: theme === 'dark' ? '#333' : '#fff' }}>
            <h1>React хуки</h1>

            {/* useState */}
            <div>
                <h2>useState</h2>
                <p>Счётчик: {count}</p>
                <button onClick={() => setCount(count + 1)}>+1</button>

                <p>Имя: {name}</p>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Введите имя"
                />
            </div>

            {/* useRef */}
            <div>
              <h2>useRef</h2>
              <input ref={inputRef} placeholder="Фокус по кнопке" />
              <button onClick={() => inputRef.current.focus()}>
                Фокус на input
              </button>
            </div>

            {/* useMemo */}
            <div>
              <h2>useMemo</h2>
              <p>Счет × 1000 = {expensiveValue}</p>
            </div>

            {/* useCallback */}
            <div>
              <h2>useCallback</h2>
              <button onClick={handleClick}>Показать счет в консоли</button>
            </div>

            {/* useReducer */}
            <div>
              <h2>useReducer</h2>
              <p>Счет: {state.count}</p>
              <button onClick={() => dispatch({ type: 'increment' })}>+</button>
              <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            </div>

            {/* useContext */}
            <div>
              <h2>useContext</h2>
              <p>Текущая тема: {theme}</p>
            </div>
          </div>
        );
}

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Переключить тему: {theme}
        </button>
        <Hooks />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;