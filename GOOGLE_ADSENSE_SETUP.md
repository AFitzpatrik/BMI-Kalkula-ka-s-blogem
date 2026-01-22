# Nastavení Google AdSense

## Krok 1: Získání AdSense Publisher ID

1. Přihlaste se do [Google AdSense](https://www.google.com/adsense/)
2. Získejte své Publisher ID (formát: `ca-pub-XXXXXXXXXXXXXXXX`)

## Krok 2: Aktualizace kódu

### V `app/layout.tsx`:
Najděte řádek s `data-ad-client` a nahraďte `ca-pub-XXXXXXXXXXXXXXXX` svým skutečným Publisher ID:

```tsx
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-VASE_ID"
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

### V `components/AdBanner.tsx`:
Najděte řádek s `data-ad-client` a nahraďte `ca-pub-XXXXXXXXXXXXXXXX` svým skutečným Publisher ID:

```tsx
data-ad-client="ca-pub-VASE_ID"
```

## Krok 3: Vytvoření reklamní jednotky

1. V Google AdSense dashboardu jděte na "Reklamy" → "Podle jednotek"
2. Vytvořte novou reklamní jednotku
3. Zkopírujte "Ad unit ID" (formát: `1234567890`)

## Krok 4: Aktualizace Ad Slot

V `components/AdBanner.tsx` můžete upravit `slot` prop:

```tsx
<AdBanner slot="VASE_AD_UNIT_ID" />
```

## Krok 5: Umístění reklam

Reklamy jsou aktuálně umístěny:
- Na hlavní stránce pod BMI kalkulačkou (`app/page.tsx`)

Můžete přidat další reklamy kamkoliv pomocí:
```tsx
import AdBanner from '@/components/AdBanner'

<AdBanner slot="VASE_AD_UNIT_ID" />
```

## Poznámky

- Reklamy se zobrazí až po schválení vaší AdSense žádosti
- Během testování můžete vidět testovací reklamy
- Ujistěte se, že máte dostatek obsahu na stránce pro schválení AdSense
