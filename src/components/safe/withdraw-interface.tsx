import { useOrderUIContext } from 'src/contexts/order-ui.context';
import { useSettingsContext } from 'src/contexts/settings.context';
import { SafeOperationType } from 'src/dto/safe.dto';
import { OrderType } from 'src/hooks/order.hook';
import { useSafe } from 'src/hooks/safe.hook';
import { OrderInterface } from '../order/order-interface';

export const WithdrawInterface = () => {
  const { translate } = useSettingsContext();
  const { withdrawableAssets, availableCurrencies, fetchWithdrawInfo, confirmWithdraw } = useSafe();
  const { setCompletionType } = useOrderUIContext();

  async function onConfirmWithdraw(): Promise<void> {
    await confirmWithdraw();
    setCompletionType(SafeOperationType.WITHDRAW);
  }

  return (
    <OrderInterface
      orderType={OrderType.SELL}
      sourceInputLabel={translate('screens/payment', 'Amount')}
      sourceAssets={withdrawableAssets}
      targetAssets={availableCurrencies}
      hideAddressSelection={true}
      confirmPayment={onConfirmWithdraw}
      onFetchPaymentInfo={fetchWithdrawInfo}
    />
  );
};
