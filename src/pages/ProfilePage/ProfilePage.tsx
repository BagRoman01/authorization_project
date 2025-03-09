import React, { useState, useContext } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Context } from '../../main';
import CurrencyService from '../../Services/CurrencyService';

// Интерфейс для данных о валюте
interface CurrencyData {
  name: string;
  symbol: string;
  symbol_native: string;
}

// Тип для массива валют (где ключ - это код валюты)
interface CurrencyResponse {
  [key: string]: CurrencyData;
}

// Тип данных для состояния
interface CurrencyItem extends CurrencyData {
  code: string;
}

const ProfilePage: React.FC = () => {
  const [currencies, setCurrencies] = useState<CurrencyItem[]>([]);
  const { store } = useContext(Context);

  // Функция для получения данных валют
  async function getCurrencies() {
    try {
      const response = await CurrencyService.fetchCurrencies();
      const data: CurrencyResponse = response.data;
      const currencyArray: CurrencyItem[] = Object.keys(data).map((key) => ({
        code: key,
        ...data[key]
      }));
      setCurrencies(currencyArray);
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  }

  return (
    <div>
      <h1>Авторизован</h1>

      <Button
        variant="contained"
        color="primary"
        onClick={() => store.logout()}
      >
        Выйти
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={getCurrencies}
      >
        Получить валюты
      </Button>

      {currencies.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Код валюты</TableCell>
                <TableCell>Символ</TableCell>
                <TableCell>Название</TableCell>
                <TableCell>Нативный символ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currencies.map((currency) => (
                <TableRow key={currency.code}>
                  <TableCell>{currency.code}</TableCell>
                  <TableCell>{currency.symbol}</TableCell>
                  <TableCell>{currency.name}</TableCell>
                  <TableCell>{currency.symbol_native}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default observer(ProfilePage);
