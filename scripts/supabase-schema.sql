-- Rezervasyonlar / Siparisler tablosu
CREATE TABLE reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  -- Musteri bilgileri
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,

  -- Tur bilgileri
  tour_name TEXT NOT NULL,
  destination TEXT NOT NULL,
  tour_date TEXT,
  people_count INTEGER DEFAULT 1,
  message TEXT,

  -- Odeme bilgileri
  amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'TRY',
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT DEFAULT 'paytr',
  paytr_token TEXT,
  paytr_merchant_oid TEXT UNIQUE,

  -- Durum
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'confirmed', 'cancelled', 'completed'))
);

-- Musteriler tablosu
CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0
);

-- RLS (Row Level Security) politikalari
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Service role her seyi yapabilir (API routes icin)
CREATE POLICY "Service role full access on reservations" ON reservations
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on customers" ON customers
  FOR ALL USING (true) WITH CHECK (true);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reservations_updated_at
  BEFORE UPDATE ON reservations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
