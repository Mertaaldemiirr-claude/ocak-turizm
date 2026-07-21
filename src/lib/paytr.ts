import crypto from 'crypto'

interface PaytrPaymentParams {
  merchantOid: string
  amount: number // TRY cinsinden (kuruslu, ornek: 899.00)
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress?: string
  userIp: string
  tourName: string
}

export function createPaytrToken(params: PaytrPaymentParams) {
  const merchantId = process.env.PAYTR_MERCHANT_ID!
  const merchantKey = process.env.PAYTR_MERCHANT_KEY!
  const merchantSalt = process.env.PAYTR_MERCHANT_SALT!
  const successUrl = process.env.PAYTR_SUCCESS_URL!
  const failUrl = process.env.PAYTR_FAIL_URL!

  // Tutar kuruş cinsinden (100 ile çarp)
  const paymentAmount = Math.round(params.amount * 100)

  // Sepet (basket) - JSON encode + base64
  const basket = JSON.stringify([
    [params.tourName, paymentAmount.toString(), '1'],
  ])
  const userBasket = Buffer.from(basket).toString('base64')

  const noInstallment = '0' // taksit acik
  const maxInstallment = '12'
  const currency = 'TL'
  const testMode = '1' // test modu (canli icin '0')
  const debugOn = '1'
  const timeoutLimit = '30'
  const lang = 'tr'

  // Hash string
  const hashStr = [
    merchantId,
    params.userIp,
    params.merchantOid,
    params.customerEmail,
    paymentAmount.toString(),
    userBasket,
    noInstallment,
    maxInstallment,
    currency,
    testMode,
  ].join('')

  // HMAC SHA256 token
  const paytrToken = crypto
    .createHmac('sha256', merchantKey)
    .update(hashStr + merchantSalt)
    .digest('base64')

  return {
    merchant_id: merchantId,
    user_ip: params.userIp,
    merchant_oid: params.merchantOid,
    email: params.customerEmail,
    payment_amount: paymentAmount.toString(),
    paytr_token: paytrToken,
    user_basket: userBasket,
    debug_on: debugOn,
    no_installment: noInstallment,
    max_installment: maxInstallment,
    timeout_limit: timeoutLimit,
    currency,
    test_mode: testMode,
    lang,
    user_name: params.customerName,
    user_phone: params.customerPhone,
    user_address: params.customerAddress || 'Türkiye',
    merchant_ok_url: successUrl,
    merchant_fail_url: failUrl,
  }
}

export function verifyPaytrCallback(
  merchantOid: string,
  status: string,
  totalAmount: string,
  hash: string
) {
  const merchantKey = process.env.PAYTR_MERCHANT_KEY!
  const merchantSalt = process.env.PAYTR_MERCHANT_SALT!

  const hashStr = merchantOid + merchantSalt + status + totalAmount
  const expectedHash = crypto
    .createHmac('sha256', merchantKey)
    .update(hashStr)
    .digest('base64')

  return hash === expectedHash
}
