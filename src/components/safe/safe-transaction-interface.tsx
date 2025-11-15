import { useState } from 'react';
import { useSettingsContext } from 'src/contexts/settings.context';
import { ButtonGroup, ButtonGroupSize } from './button-group';
import { DepositInterface } from './deposit-interface';
import { ReceiveInterface } from './receive-interface';
import { SendInterface } from './send-interface';
import { SwapInterface } from './swap-interface';
import { WithdrawInterface } from './withdraw-interface';

enum TransactionMode {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  SWAP = 'swap',
}

enum DepositType {
  FIAT = 'fiat',
  CRYPTO = 'crypto',
}

export const SafeTransactionInterface = () => {
  const { translate } = useSettingsContext();
  const [mode, setMode] = useState<TransactionMode>(TransactionMode.DEPOSIT);
  const [depositType, setDepositType] = useState<DepositType>(DepositType.FIAT);

  const showTypeSelector = mode !== TransactionMode.SWAP;

  const getInterface = () => {
    if (mode === TransactionMode.SWAP) return <SwapInterface />;

    const isFiat = depositType === DepositType.FIAT;
    if (mode === TransactionMode.DEPOSIT) return isFiat ? <DepositInterface /> : <ReceiveInterface />;
    return isFiat ? <WithdrawInterface /> : <SendInterface />;
  };

  return (
    <div>
      <div className="mb-2 flex justify-center">
        <ButtonGroup<TransactionMode>
          items={[TransactionMode.DEPOSIT, TransactionMode.WITHDRAW, TransactionMode.SWAP]}
          selected={mode}
          onClick={setMode}
          buttonLabel={(mode) => {
            switch (mode) {
              case TransactionMode.DEPOSIT:
                return translate('screens/safe', 'Deposit');
              case TransactionMode.WITHDRAW:
                return translate('screens/safe', 'Withdraw');
              case TransactionMode.SWAP:
                return translate('screens/safe', 'Swap');
            }
          }}
          isHeader={true}
        />
      </div>
      {showTypeSelector && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-dfxGray-700">{translate('screens/payment', 'Type')}:</span>
          <ButtonGroup<DepositType>
            items={[DepositType.FIAT, DepositType.CRYPTO]}
            selected={depositType}
            onClick={setDepositType}
            buttonLabel={(type) =>
              type === DepositType.FIAT ? translate('screens/payment', 'Fiat') : translate('screens/payment', 'Crypto')
            }
            size={ButtonGroupSize.SM}
          />
        </div>
      )}
      {getInterface()}
    </div>
  );
};
