import React, { useEffect, useState } from 'react';
import { CONFIG, getApiUrl } from './config';
import {
  Container, Box, Typography, Grid, Paper, TextField, Button, Chip,
  Table, TableHead, TableBody, TableRow, TableCell, TableContainer,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, IconButton, InputAdornment
} from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon, Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, People as PeopleIcon } from '@mui/icons-material';

export default function Employees() {
  const [empleados, setEmpleados] = useState([]);
  const [estadisticas, setEstadisticas] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Filtros
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroIdentificacion, setFiltroIdentificacion] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  // Form dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({
    identificacion: '', nombres: '', apellidos: '', email: '', telefono: '',
    fecha_ingreso: '', cargo: '', salario_base: '', tipo_contrato: 'Indefinido', estado: 'Activo'
  });

  useEffect(() => {
    cargarEmpleados();
    cargarEstadisticas();
  }, []);

  const cargarEmpleados = async () => {
    try {
      let url = getApiUrl('EMPLEADOS');
      const params = new URLSearchParams();
      if (filtroNombre) params.append('nombre', filtroNombre);
      if (filtroIdentificacion) params.append('identificacion', filtroIdentificacion);
      if (filtroEstado) params.append('estado', filtroEstado);
      if (params.toString()) url += '?' + params.toString();
      const res = await fetch(url);
      const data = await res.json();
      setEmpleados(data);
    } catch {
      notify('Error al cargar empleados', 'error');
    }
  };

  const cargarEstadisticas = async () => {
    try {
      const res = await fetch(getApiUrl('ESTADISTICAS'));
      const data = await res.json();
      setEstadisticas(data);
    } catch {}
  };

  const notify = (message, severity = 'success') => setSnackbar({ open: true, message, severity });
  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const hayFiltros = () => filtroNombre || filtroIdentificacion || filtroEstado;
  const resumenFiltros = () => {
    const f = [];
    if (filtroNombre) f.push(`Nombre: "${filtroNombre}"`);
    if (filtroIdentificacion) f.push(`ID: "${filtroIdentificacion}"`);
    if (filtroEstado) f.push(`Estado: "${filtroEstado}"`);
    return f.join(', ');
  };

  const onEdit = (idx) => {
    const e = empleados[idx];
    setForm({
      identificacion: e.identificacion,
      nombres: e.nombres,
      apellidos: e.apellidos,
      email: e.email || '',
      telefono: e.telefono || '',
      fecha_ingreso: e.fecha_ingreso ? e.fecha_ingreso.substring(0, 10) : '',
      cargo: e.cargo,
      salario_base: e.salario_base,
      tipo_contrato: e.tipo_contrato || 'Indefinido',
      estado: e.estado || 'Activo'
    });
    setEditIndex(idx);
    setOpenDialog(true);
  };

  const onDelete = async (idx) => {
    const e = empleados[idx];
    if (!window.confirm(`¿Eliminar empleado ${e.nombres} ${e.apellidos}?`)) return;
    try {
      const res = await fetch(`${getApiUrl('EMPLEADOS')}/${e.id}`, { method: 'DELETE' });
      if (res.ok) {
        setEmpleados(empleados.filter((_, i) => i !== idx));
        notify('Empleado eliminado');
        cargarEstadisticas();
      } else notify('No se pudo eliminar', 'error');
    } catch { notify('Error de conexión', 'error'); }
  };

  const resetForm = () => {
    setForm({ identificacion: '', nombres: '', apellidos: '', email: '', telefono: '', fecha_ingreso: '', cargo: '', salario_base: '', tipo_contrato: 'Indefinido', estado: 'Activo' });
    setEditIndex(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const required = ['identificacion', 'nombres', 'apellidos', 'fecha_ingreso', 'cargo', 'salario_base'];
    for (const k of required) { 
      const value = String(form[k] || '').trim();
      if (!value) { 
        notify(`Complete el campo requerido: ${k}`, 'error'); 
        return; 
      } 
    }
    
    // Validar que salario_base sea un número válido
    if (isNaN(Number(form.salario_base)) || Number(form.salario_base) <= 0) {
      notify('El salario base debe ser un número mayor a 0', 'error');
      return;
    }
    
    // Validar formato de email si se proporciona
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      notify('El formato del email no es válido', 'error');
      return;
    }
    
    try {
      if (editIndex !== null) {
        const base = empleados[editIndex];
        const res = await fetch(`${getApiUrl('EMPLEADOS')}/${base.id}`, { 
          method: 'PUT', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ ...form, salario_base: Number(form.salario_base) })
        });
        if (res.ok) {
          notify('Empleado actualizado');
          cargarEmpleados();
        } else {
          const err = await res.json();
          notify(err.error || 'No se pudo actualizar', 'error');
        }
      } else {
        const res = await fetch(getApiUrl('EMPLEADOS'), { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ ...form, salario_base: Number(form.salario_base) })
        });
        const data = await res.json();
        if (res.ok) {
          notify('Empleado creado');
          cargarEmpleados();
        } else notify(data.error || 'No se pudo crear', 'error');
      }
      setOpenDialog(false);
      resetForm();
      cargarEstadisticas();
    } catch { notify('Error de conexión', 'error'); }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom color="text.primary">{CONFIG.APP.NOMBRE}</Typography>
        <Typography variant="h6" color="text.secondary">{CONFIG.APP.DESCRIPCION}</Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
            <Typography variant="overline" color="text.secondary">Empleados</Typography>
            <Typography variant="h5">{estadisticas.total_empleados || 0}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
            <Typography variant="overline" color="text.secondary">Activos</Typography>
            <Typography variant="h5">{estadisticas.empleados_activos || 0}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
            <Typography variant="overline" color="text.secondary">Salario promedio</Typography>
            <Typography variant="h6">${Number(estadisticas.salario_promedio || 0).toFixed(2)}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1">
            Filtros de Empleados
          </Typography>
          {hayFiltros() && (<Chip label={`Filtros: ${resumenFiltros()}`} onDelete={() => { setFiltroNombre(''); setFiltroIdentificacion(''); setFiltroEstado(''); cargarEmpleados(); }} />)}
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth size="small" label="Nombre" value={filtroNombre} onChange={(e) => setFiltroNombre(e.target.value)} onKeyDown={(e)=> e.key==='Enter'&&cargarEmpleados()} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth size="small" label="Identificación" value={filtroIdentificacion} onChange={(e) => setFiltroIdentificacion(e.target.value)} onKeyDown={(e)=> e.key==='Enter'&&cargarEmpleados()} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Estado</InputLabel>
              <Select value={filtroEstado} label="Estado" onChange={(e)=> { setFiltroEstado(e.target.value); setTimeout(cargarEmpleados, 100); }}>
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Activo">Activo</MenuItem>
                <MenuItem value="Inactivo">Inactivo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button variant="contained" onClick={cargarEmpleados}>Buscar</Button>
          <Button variant="outlined" onClick={() => { setFiltroNombre(''); setFiltroIdentificacion(''); setFiltroEstado(''); cargarEmpleados(); }}>Limpiar</Button>
        </Box>
      </Paper>

      <Box sx={{ mb: 2, textAlign: 'right' }}>
        <Button variant="contained" onClick={() => { resetForm(); setOpenDialog(true); }}>Agregar Empleado</Button>
      </Box>

      <TableContainer component={Paper} sx={{ bgcolor: 'background.paper' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'text.secondary' }}>Nombre</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>Identificación</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>Cargo</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>Salario</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>Estado</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {empleados.length === 0 ? (
              <TableRow><TableCell colSpan={6} align="center">{hayFiltros() ? 'Sin resultados' : 'No hay empleados'}</TableCell></TableRow>
            ) : empleados.map((e, idx) => (
              <TableRow key={idx} hover>
                <TableCell>{e.apellidos}, {e.nombres}</TableCell>
                <TableCell>{e.identificacion}</TableCell>
                <TableCell>{e.cargo}</TableCell>
                <TableCell>
                  <Chip label={`$${Number(e.salario_base).toFixed(2)}`} color="success" size="small" />
                </TableCell>
                <TableCell>
                  <Chip label={e.estado} color={e.estado === 'Activo' ? 'success' : 'default'} size="small" />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => onEdit(idx)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => onDelete(idx)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editIndex !== null ? 'Editar Empleado' : 'Nuevo Empleado'}</DialogTitle>
        <form onSubmit={onSubmit}>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField size="small" fullWidth required label="Identificación" value={form.identificacion} onChange={(e)=> setForm({ ...form, identificacion: e.target.value })} /></Grid>
              <Grid item xs={12} sm={6}><TextField size="small" fullWidth required type="date" label="Fecha ingreso" value={form.fecha_ingreso} onChange={(e)=> setForm({ ...form, fecha_ingreso: e.target.value })} InputLabelProps={{ shrink: true }} /></Grid>
              <Grid item xs={12} sm={6}><TextField size="small" fullWidth required label="Nombres" value={form.nombres} onChange={(e)=> setForm({ ...form, nombres: e.target.value })} /></Grid>
              <Grid item xs={12} sm={6}><TextField size="small" fullWidth required label="Apellidos" value={form.apellidos} onChange={(e)=> setForm({ ...form, apellidos: e.target.value })} /></Grid>
              <Grid item xs={12} sm={6}><TextField size="small" fullWidth type="email" label="Correo" value={form.email} onChange={(e)=> setForm({ ...form, email: e.target.value })} /></Grid>
              <Grid item xs={12} sm={6}><TextField size="small" fullWidth label="Teléfono" value={form.telefono} onChange={(e)=> setForm({ ...form, telefono: e.target.value })} /></Grid>
              <Grid item xs={12} sm={6}><TextField size="small" fullWidth required label="Cargo" value={form.cargo} onChange={(e)=> setForm({ ...form, cargo: e.target.value })} /></Grid>
              <Grid item xs={12} sm={6}><TextField size="small" fullWidth required type="number" label="Salario base" value={form.salario_base} onChange={(e)=> setForm({ ...form, salario_base: e.target.value })} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} /></Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Tipo contrato</InputLabel>
                  <Select label="Tipo contrato" value={form.tipo_contrato} onChange={(e)=> setForm({ ...form, tipo_contrato: e.target.value })}>
                    <MenuItem value={'Fijo'}>Fijo</MenuItem>
                    <MenuItem value={'Indefinido'}>Indefinido</MenuItem>
                    <MenuItem value={'Temporal'}>Temporal</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Estado</InputLabel>
                  <Select label="Estado" value={form.estado} onChange={(e)=> setForm({ ...form, estado: e.target.value })}>
                    <MenuItem value={'Activo'}>Activo</MenuItem>
                    <MenuItem value={'Inactivo'}>Inactivo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button type="submit" variant="contained">{editIndex !== null ? 'Actualizar' : 'Guardar'}</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={closeSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}


