import React, { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';
import { Save } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [telemetryFrequency, setTelemetryFrequency] = useState('1000');
  const [oeeTarget, setOeeTarget] = useState('90.0');
  const [thermalTolerance, setThermalTolerance] = useState('65.0');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e2e8f0]">
        <div>
          <h1 className="text-xl font-bold text-[#0f172a] tracking-tight">
            System & Facility Configuration
          </h1>
          <p className="text-xs text-[#64748b] mt-1">
            Global telemetry thresholds, shift scheduling intervals, and OPC-UA connectivity.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleSave}
          icon={<Save className="w-3.5 h-3.5" />}
        >
          {saved ? 'Saved Successfully!' : 'Save Settings'}
        </Button>
      </div>

      <div className="flex flex-col gap-5">
        <Card title="Industrial Telemetry Stream & Sampling" subtitle="Edge gateway polling and cycle time resolution">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[#0f172a] font-semibold mb-1">
                Edge Polling Rate (ms)
              </label>
              <input
                type="number"
                value={telemetryFrequency}
                onChange={(e) => setTelemetryFrequency(e.target.value)}
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded p-2 font-mono text-xs text-[#0f172a] outline-hidden focus:border-[#006194]"
              />
              <span className="text-[10px] text-[#64748b] mt-1 block">Default: 1000ms (1 Hz)</span>
            </div>

            <div>
              <label className="block text-[#0f172a] font-semibold mb-1">
                OEE Target Benchmark (%)
              </label>
              <input
                type="number"
                value={oeeTarget}
                onChange={(e) => setOeeTarget(e.target.value)}
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded p-2 font-mono text-xs text-[#0f172a] outline-hidden focus:border-[#006194]"
              />
              <span className="text-[10px] text-[#64748b] mt-1 block">Global plant KPI benchmark</span>
            </div>

            <div>
              <label className="block text-[#0f172a] font-semibold mb-1">
                Thermal Alert Ceiling (°C)
              </label>
              <input
                type="number"
                value={thermalTolerance}
                onChange={(e) => setThermalTolerance(e.target.value)}
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded p-2 font-mono text-xs text-[#0f172a] outline-hidden focus:border-[#006194]"
              />
              <span className="text-[10px] text-[#64748b] mt-1 block">Triggers Warning status on lines</span>
            </div>

            <div>
              <label className="block text-[#0f172a] font-semibold mb-1">
                OPC-UA Protocol Security Mode
              </label>
              <select className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded p-2 font-mono text-xs text-[#0f172a] outline-hidden focus:border-[#006194]">
                <option value="SignAndEncrypt_Basic256Sha256">Basic256Sha256 (Signed & Encrypted)</option>
                <option value="Aes128_Sha256_RsaOaep">Aes128_Sha256_RsaOaep</option>
              </select>
              <span className="text-[10px] text-[#64748b] mt-1 block">Zero-trust plant floor connectivity</span>
            </div>
          </div>
        </Card>

        <Card title="Shift Schedule Boundaries" subtitle="Automated OEE reset and handover hours">
          <div className="flex flex-col gap-2.5 text-xs">
            <div className="p-3 bg-[#f8fafc] rounded border border-[#e2e8f0] flex justify-between items-center">
              <div>
                <span className="font-bold text-[#0f172a] block">Shift 1 (Morning & Early Day)</span>
                <span className="text-[10px] text-[#64748b] font-mono">06:00:00 - 14:00:00 (8 Hours)</span>
              </div>
              <Badge variant="success">ACTIVE NOW</Badge>
            </div>

            <div className="p-3 bg-[#f8fafc] rounded border border-[#e2e8f0] flex justify-between items-center">
              <div>
                <span className="font-bold text-[#0f172a] block">Shift 2 (Afternoon & Twilight)</span>
                <span className="text-[10px] text-[#64748b] font-mono">14:00:00 - 22:00:00 (8 Hours)</span>
              </div>
              <Badge variant="neutral">QUEUED</Badge>
            </div>

            <div className="p-3 bg-[#f8fafc] rounded border border-[#e2e8f0] flex justify-between items-center">
              <div>
                <span className="font-bold text-[#0f172a] block">Shift 3 (Overnight Continuous)</span>
                <span className="text-[10px] text-[#64748b] font-mono">22:00:00 - 06:00:00 (8 Hours)</span>
              </div>
              <Badge variant="neutral">QUEUED</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
