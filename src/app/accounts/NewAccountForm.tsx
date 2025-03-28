import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { createAccount, updateAccount, archiveAccount, getAllAccounts } from '@/models/account';
import { Account } from '@/models/types';

export default function NewAccountForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<Partial<Account> | null>(null);
  
  // フォーム状態
  const [name, setName] = useState('');
  const [type, setType] = useState<'credit_card' | 'bank_account'>('bank_account');
  const [balance, setBalance] = useState('');
  const [currency, setCurrency] = useState('JPY');
  const [color, setColor] = useState('#3B82F6');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [creditLimit, setCreditLimit] = useState('');
  const [paymentDueDay, setPaymentDueDay] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // モーダルを開く（新規作成）
  const handleOpenModal = () => {
    resetForm();
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // フォームのリセット
  const resetForm = () => {
    setCurrentAccount(null);
    setName('');
    setType('bank_account');
    setBalance('');
    setCurrency('JPY');
    setColor('#3B82F6');
    setCardNumber('');
    setExpiryDate('');
    setCreditLimit('');
    setPaymentDueDay('');
    setAccountNumber('');
    setBankName('');
    setInterestRate('');
    setFormErrors({});
  };

  // フォームの検証
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!name.trim()) {
      errors.name = 'アカウント名は必須です';
    }
    
    if (!balance.trim() || isNaN(Number(balance))) {
      errors.balance = '有効な残高を入力してください';
    }
    
    if (type === 'credit_card') {
      if (cardNumber && cardNumber.length !== 4) {
        errors.cardNumber = 'カード番号の下4桁を入力してください';
      }
      
      if (creditLimit && isNaN(Number(creditLimit))) {
        errors.creditLimit = '有効な利用限度額を入力してください';
      }
      
      if (paymentDueDay && (isNaN(Number(paymentDueDay)) || Number(paymentDueDay) < 1 || Number(paymentDueDay) > 31)) {
        errors.paymentDueDay = '有効な支払日（1-31）を入力してください';
      }
    } else {
      if (accountNumber && accountNumber.length !== 4) {
        errors.accountNumber = '口座番号の下4桁を入力してください';
      }
      
      if (interestRate && (isNaN(Number(interestRate)) || Number(interestRate) < 0)) {
        errors.interestRate = '有効な金利を入力してください';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // フォームの送信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const accountData: Omit<Account, 'id' | 'createdAt' | 'updatedAt'> = {
        name,
        type,
        balance: Number(balance),
        currency,
        color,
        isArchived: false,
      };
      
      if (type === 'credit_card') {
        accountData.cardNumber = cardNumber;
        accountData.expiryDate = expiryDate;
        accountData.creditLimit = creditLimit ? Number(creditLimit) : undefined;
        accountData.paymentDueDay = paymentDueDay ? Number(paymentDueDay) : undefined;
      } else {
        accountData.accountNumber = accountNumber;
        accountData.bankName = bankName;
        accountData.interestRate = interestRate ? Number(interestRate) : undefined;
      }
      
      if (isEditing && currentAccount?.id) {
        await updateAccount(currentAccount.id, accountData);
      } else {
        await createAccount(accountData);
      }
      
      resetForm();
      setIsModalOpen(false);
      window.location.reload(); // 簡易的な更新方法
    } catch (error) {
      console.error('アカウントの保存に失敗しました:', error);
    }
  };

  return (
    <div>
      <Card title="新しいアカウントを追加">
        <p className="text-gray-500 mb-4">
          クレジットカードや銀行口座などの金融アカウントを追加して、資産を一元管理しましょう。
        </p>
        <Button onClick={handleOpenModal} fullWidth>
          アカウントを追加
        </Button>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? 'アカウントを編集' : 'アカウントを追加'}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="mr-3"
            >
              キャンセル
            </Button>
            <Button onClick={handleSubmit}>
              {isEditing ? '更新' : '追加'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="name"
            label="アカウント名"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={formErrors.name}
            required
          />
          
          <Select
            id="type"
            label="アカウントタイプ"
            value={type}
            onChange={(e) => setType(e.target.value as 'credit_card' | 'bank_account')}
            options={[
              { value: 'bank_account', label: '銀行口座' },
              { value: 'credit_card', label: 'クレジットカード' },
            ]}
            required
          />
          
          <Input
            id="balance"
            label="残高"
            type="number"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            error={formErrors.balance}
            required
          />
          
          <Select
            id="currency"
            label="通貨"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            options={[
              { value: 'JPY', label: '日本円 (JPY)' },
              { value: 'USD', label: '米ドル (USD)' },
              { value: 'EUR', label: 'ユーロ (EUR)' },
            ]}
            required
          />
          
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">
              カラー
            </label>
            <div className="mt-1">
              <input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-full rounded-md border border-gray-300"
              />
            </div>
          </div>
          
          {type === 'credit_card' ? (
            <>
              <Input
                id="cardNumber"
                label="カード番号（下4桁）"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                error={formErrors.cardNumber}
                maxLength={4}
              />
              
              <Input
                id="expiryDate"
                label="有効期限（MM/YY）"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="12/25"
              />
              
              <Input
                id="creditLimit"
                label="利用限度額"
                type="number"
                value={creditLimit}
                onChange={(e) => setCreditLimit(e.target.value)}
                error={formErrors.creditLimit}
              />
              
              <Input
                id="paymentDueDay"
                label="支払日"
                type="number"
                value={paymentDueDay}
                onChange={(e) => setPaymentDueDay(e.target.value)}
                error={formErrors.paymentDueDay}
                placeholder="1-31"
              />
            </>
          ) : (
            <>
              <Input
                id="accountNumber"
                label="口座番号（下4桁）"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                error={formErrors.accountNumber}
                maxLength={4}
              />
              
              <Input
                id="bankName"
                label="銀行名"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
              
              <Input
                id="interestRate"
                label="金利（%）"
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                error={formErrors.interestRate}
              />
            </>
          )}
        </form>
      </Modal>
    </div>
  );
}
