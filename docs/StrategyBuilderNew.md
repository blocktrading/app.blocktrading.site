# Nuovo Strategy Builder

## Panoramica

È stato creato un nuovo Strategy Builder semplificato che prende ispirazione dal design grafico del vecchio editor ma con un'architettura più pulita e gestibile.

## Caratteristiche Implementate

### 1. Layout a 3 Pannelli
- **Pannello Sinistro (Toolbox)**: Configurazione strategia e blocchi disponibili
- **Canvas Centrale**: Area di lavoro per il drag & drop dei blocchi
- **Pannello Destro (Inspector)**: Configurazione parametri del blocco selezionato

### 2. Header Personalizzato
- Pulsante di ritorno alla dashboard
- Informazioni strategia (nome e stato)
- Azioni rapide: Test, Backtest, Save, Deploy

### 3. Pannello Toolbox (Sinistra)
- **Configurazione Strategia**: Nome e asset principale
- **Blocchi Disponibili**: Organizzati per categoria
  - Indicatori Tecnici (SMA, EMA, RSI, MACD, Bollinger)
  - Condizioni di Mercato (Price Above/Below, Volume Surge, Trend)
  - Generatori di Segnali (Crossover, Threshold, Pattern)
  - Azioni di Trading (Buy/Sell Order, Stop Loss, Take Profit)
  - Operatori Logici (AND, OR, NOT, IF-THEN)
- **Ricerca**: Filtro per nome/descrizione dei blocchi
- **Categorie Espandibili**: Per organizzare i blocchi

### 4. Canvas Centrale
- **Drag & Drop**: Trascina blocchi dal toolbox al canvas
- **Selezione Blocchi**: Click per selezionare e configurare
- **Toolbar**: Fit to view, Auto arrange, Clear all, Delete selected
- **Grid Pattern**: Sfondo a griglia per allineamento
- **Minimap**: Vista miniaturizzata del canvas
- **Drop Zone**: Messaggio di istruzioni quando vuoto

### 5. Inspector Panel (Destra)
- **Configurazione Dinamica**: Campi specifici per tipo di blocco
- **Validazione**: Campi obbligatori e vincoli
- **Tipi di Input**: Text, Number, Select, Checkbox, Textarea
- **Valori Default**: Pre-popolati per ogni tipo di blocco
- **Azioni**: Reset e Apply changes

## Struttura File

```
src/components/StrategyBuilderNew/
├── layout/
│   ├── NewStrategyBuilderLayout.tsx        # Layout principale
│   └── NewStrategyBuilderLayout.module.css # Stili layout
├── panels/
│   ├── ToolboxPanel.tsx                    # Pannello sinistro
│   ├── CanvasPanel.tsx                     # Canvas centrale
│   ├── InspectorPanel.tsx                  # Pannello destro
│   └── panels.module.css                   # Stili pannelli
└── index.ts                                # Export dei componenti
```

## Componenti

### NewStrategyBuilderLayout
Layout principale che include l'header personalizzato e l'area di contenuto.

### ToolboxPanel
- Configurazione nome strategia e asset
- Lista blocchi organizzati per categoria
- Ricerca e filtri
- Drag support per i blocchi

### CanvasPanel
- Area di drop per i blocchi
- Gestione selezione
- Toolbar con azioni
- Minimap per navigazione
- Versione semplificata (TODO: integrare Rete.js)

### InspectorPanel
- Configurazione dinamica basata sul tipo di blocco
- Campi di input specifici
- Validazione e valori default
- Azioni di salvataggio

## Navigazione

- **Nuovo Strategy Builder**: `/strategy-builder`
- **Vecchio Strategy Builder**: `/strategy-builder-old`

Entrambi sono accessibili dal menu laterale della piattaforma.

## Note Tecniche

### Dipendenze
- React 19.1.0
- TypeScript
- CSS Modules per lo styling
- Rete.js (installato ma non ancora integrato)

### Stato
- Drag & Drop: ✅ Funzionante
- Selezione blocchi: ✅ Funzionante
- Configurazione dinamica: ✅ Funzionante
- Rete.js integration: ⏳ TODO (problemi di compatibilità)
- Connessioni tra blocchi: ⏳ TODO
- Salvataggio/caricamento: ⏳ TODO

### Prossimi Passi

1. **Integrare Rete.js**: Risolvere problemi di compatibilità per abilitare connessioni
2. **Sistema di Connessioni**: Implementare connessioni tra blocchi
3. **Salvataggio**: Sistema di save/load delle strategie
4. **Validazione**: Controllo logico delle connessioni
5. **Export/Import**: Funzionalità di esportazione strategia
6. **Testing**: Integrazione con sistema di backtesting

## Stile Grafico

Il design mantiene la coerenza con il vecchio strategy builder:
- Colori della palette esistente
- Layout a pannelli
- Header dedicato
- Icone e typography coerenti
- Animazioni e transizioni fluide

## Codice Gestibile

- **Componenti Isolati**: Ogni pannello è indipendente
- **Props Interface**: API chiare tra componenti
- **CSS Modules**: Stili isolati per evitare conflitti
- **TypeScript**: Type safety completo
- **Documentazione**: JSDoc per tutte le funzioni principali
- **Struttura Modulare**: Facile aggiungere nuovi tipi di blocchi
