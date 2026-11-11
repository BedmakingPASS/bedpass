import { useState } from 'react'
import { supabase } from '../lib/supabase' // sesuaikan path

function TolakModal({ penilaianId, onClose, onDone }) {
  const [alasan, setAlasan] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleTolak() {
    if (alasan.trim().length < 10) {
      setError('Alasan penolakan wajib diisi (minimal 10 karakter).')
      return
    }
    setLoading(true)
    const { error } = await supabase
      .from('penilaian')
      .update({
        status: 'ditolak',
        alasan_penolakan: alasan.trim(),
        ditolak_pada: new Date().toISOString(),
      })
      .eq('id', penilaianId)

    setLoading(false)
    if (error) return setError('Gagal menolak: ' + error.message)
    onDone()
  }

  return (
    <div className="modal">
      <h3>Tolak Hasil Penilaian</h3>
      <label>Alasan penolakan <span style={{ color: 'red' }}>*</span></label>
      <textarea
        rows={4}
        value={alasan}
        onChange={(e) => { setAlasan(e.target.value); setError('') }}
        placeholder="Jelaskan bagian mana yang perlu diperbaiki SPV..."
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={onClose}>Batal</button>
      <button onClick={handleTolak} disabled={loading}>
        {loading ? 'Menyimpan...' : 'Tolak Penilaian'}
      </button>
    </div>
  )
}