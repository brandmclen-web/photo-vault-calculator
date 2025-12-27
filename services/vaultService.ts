
import { VaultItem, AppSettings } from '../types';

const STORAGE_KEY = 'ciphercalc_vault_data';
const SETTINGS_KEY = 'ciphercalc_settings';

export const getVaultItems = (): VaultItem[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveVaultItem = (item: VaultItem) => {
  const items = getVaultItems();
  items.push(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const deleteVaultItem = (id: string) => {
  const items = getVaultItems().filter(i => i.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const getAppSettings = (): AppSettings => {
  const data = localStorage.getItem(SETTINGS_KEY);
  return data ? JSON.parse(data) : {
    pin: '',
    recoveryQuestion: '',
    recoveryAnswer: '',
    isSetupComplete: false,
    stealthMode: true
  };
};

export const saveAppSettings = (settings: AppSettings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};
