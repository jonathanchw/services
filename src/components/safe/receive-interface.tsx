import { useOrderUIContext } from 'src/contexts/order-ui.context';
import { useSettingsContext } from 'src/contexts/settings.context';
import { SafeOperationType } from 'src/dto/safe.dto';
import { OrderType } from 'src/hooks/order.hook';
import { useSafe } from 'src/hooks/safe.hook';
import { OrderInterface } from '../order/order-interface';

export const ReceiveInterface = () => {
  const { translate } = useSettingsContext();
  const { receiveableAssets, fetchReceiveInfo, confirmReceive, pairMap } = useSafe();
  const { setCompletionType } = useOrderUIContext();

  async function onConfirmPayment(): Promise<void> {
    await confirmReceive();
    setCompletionType(SafeOperationType.RECEIVE);
  }

  return (
    <OrderInterface
      orderType={OrderType.RECEIVE}
      sourceInputLabel={translate('screens/payment', 'Amount')}
      sourceAssets={receiveableAssets}
      hideAddressSelection={true}
      confirmPayment={onConfirmPayment}
      onFetchPaymentInfo={fetchReceiveInfo}
    />
  );
};
