import { Asset, Utils, Validations } from '@dfx.swiss/react';
import { Form, StyledButton, StyledButtonWidth, StyledInput, StyledVerticalStack } from '@dfx.swiss/react-components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useOrderUIContext } from 'src/contexts/order-ui.context';
import { useSettingsContext } from 'src/contexts/settings.context';
import { SafeOperationType } from 'src/dto/safe.dto';
import { useSafe } from 'src/hooks/safe.hook';
import { AssetInput } from '../order/asset-input';

interface SendFormData {
  sendAsset: Asset;
  sendAmount?: string;
  targetAddress?: string;
}

export const SendInterface = () => {
  const { translate } = useSettingsContext();
  const { setCompletionType } = useOrderUIContext();
  const { sendableAssets, fetchSendInfo, confirmSend } = useSafe();

  const {
    watch,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<SendFormData>({ mode: 'onChange' });

  const data = watch();

  useEffect(() => {
    if (sendableAssets?.length && !data.sendAsset) {
      setValue('sendAsset', sendableAssets[0]);
    }
  }, [sendableAssets, data.sendAsset, setValue]);

  const rules = Utils.createRules({
    sendAsset: Validations.Required,
    sendAmount: Validations.Required,
    targetAddress: Validations.Required,
  });

  async function onConfirmSend(): Promise<void> {
    if (!isValid) return;
    await fetchSendInfo({
      sourceAsset: data.sendAsset,
      targetAsset: data.sendAsset,
      sourceAmount: data.sendAmount,
      address: data.targetAddress as any,
    });
    await confirmSend();
    setCompletionType(SafeOperationType.SEND);
  }

  return (
    <Form control={control} rules={rules} errors={errors} hasFormElement={false}>
      <StyledVerticalStack gap={4} full className="pt-2">
        <AssetInput
          control={control}
          name="sendAsset"
          label={translate('screens/payment', 'Asset')}
          placeholder="0.00"
          availableItems={sendableAssets ?? []}
          selectedItem={data.sendAsset}
          assetRules={rules.sendAsset}
          amountRules={rules.sendAmount}
          balanceFunc={() => ''}
        />

        <StyledInput
          control={control}
          name="targetAddress"
          label={translate('screens/payment', 'Recipient Address')}
          placeholder="0x..."
          full
        />

        <StyledButton
          type="button"
          label={translate('general/actions', 'Send')}
          width={StyledButtonWidth.FULL}
          disabled={!isValid}
          onClick={onConfirmSend}
        />
      </StyledVerticalStack>
    </Form>
  );
};
