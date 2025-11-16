import { useOrderUIContext } from 'src/contexts/order-ui.context';
import { useSettingsContext } from 'src/contexts/settings.context';
import { SafeOperationType } from 'src/dto/safe.dto';
import { OrderType } from 'src/hooks/order.hook';
import { useSafe } from 'src/hooks/safe.hook';
import { OrderInterface } from '../order/order-interface';

export const SendInterface = () => {
  const { translate } = useSettingsContext();
  const { sendableAssets, fetchSendInfo, confirmSend } = useSafe();
  const { setCompletionType } = useOrderUIContext();

  async function onConfirmSend(): Promise<void> {
    await confirmSend();
    setCompletionType(SafeOperationType.SEND);
  }

  async function onFetchPaymentInfo(data: any): Promise<any> {
    return fetchSendInfo({
      sourceAsset: data.sourceAsset,
      targetAsset: data.sourceAsset,
      sourceAmount: data.sourceAmount,
      address: data.address,
    });
  }

  return (
    <OrderInterface
      orderType={OrderType.SEND}
      sourceInputLabel={translate('screens/payment', 'Amount')}
      sourceAssets={sendableAssets}
      hideAddressSelection={false}
      confirmPayment={onConfirmSend}
      onFetchPaymentInfo={onFetchPaymentInfo}
    />
  );
};
