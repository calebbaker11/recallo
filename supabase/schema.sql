-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- PRACTICES TABLE
-- =====================
CREATE TABLE IF NOT EXISTS practices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  twilio_phone_number TEXT,
  forwarding_number TEXT NOT NULL,
  sms_message TEXT DEFAULT 'Hi! You just called our office. We''re sorry we missed you — click here to book your appointment: ',
  booking_link TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =====================
-- MISSED CALLS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS missed_calls (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  practice_id UUID NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  caller_number TEXT NOT NULL,
  called_at TIMESTAMPTZ NOT NULL,
  sms_sent BOOLEAN DEFAULT FALSE NOT NULL,
  sms_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =====================
-- SUBSCRIPTIONS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  practice_id UUID NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('founding', 'standard', 'ortho')),
  status TEXT NOT NULL DEFAULT 'inactive',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =====================
-- ROW LEVEL SECURITY
-- =====================

-- Practices RLS
ALTER TABLE practices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own practice"
  ON practices FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert their own practice"
  ON practices FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own practice"
  ON practices FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own practice"
  ON practices FOR DELETE
  USING (auth.uid() = owner_id);

-- Missed Calls RLS
ALTER TABLE missed_calls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own missed calls"
  ON missed_calls FOR SELECT
  USING (
    practice_id IN (
      SELECT id FROM practices WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Service role can insert missed calls"
  ON missed_calls FOR INSERT
  WITH CHECK (TRUE);

-- Subscriptions RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscriptions"
  ON subscriptions FOR SELECT
  USING (
    practice_id IN (
      SELECT id FROM practices WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Service role can manage subscriptions"
  ON subscriptions FOR ALL
  USING (TRUE)
  WITH CHECK (TRUE);

-- =====================
-- INDEXES
-- =====================
CREATE INDEX IF NOT EXISTS idx_practices_owner_id ON practices(owner_id);
CREATE INDEX IF NOT EXISTS idx_practices_twilio_phone ON practices(twilio_phone_number);
CREATE INDEX IF NOT EXISTS idx_missed_calls_practice_id ON missed_calls(practice_id);
CREATE INDEX IF NOT EXISTS idx_missed_calls_called_at ON missed_calls(called_at);
CREATE INDEX IF NOT EXISTS idx_subscriptions_practice_id ON subscriptions(practice_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_sub ON subscriptions(stripe_subscription_id);
