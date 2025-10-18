'use client';

import { useState } from 'react';
import styled from 'styled-components';

const Content = styled.div`
  padding: 16px;
  overflow-y: auto;
  height: 100%;
  background: #c0c0c0;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #000080;
  text-align: center;
`;

const FormBox = styled.div`
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  padding: 12px;
  background: #c0c0c0;
  margin-bottom: 12px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 11px;
`;

const Input = styled.input`
  width: 100%;
  padding: 4px;
  border: 2px solid;
  border-color: #808080 #dfdfdf #dfdfdf #808080;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
  margin-bottom: 12px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 6px;
  background: linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  font-weight: bold;
  cursor: pointer;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;

  &:active {
    border-color: #808080 #dfdfdf #dfdfdf #808080;
  }

  &:hover {
    background: linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #808080 100%);
  }
`;

const Message = styled.div<{ $type?: 'success' | 'error' }>`
  padding: 12px;
  margin-bottom: 12px;
  border: 2px solid;
  border-color: ${(props) => (props.$type === 'success' ? '#00aa00' : '#ff0000')};
  background: ${(props) => (props.$type === 'success' ? '#e0ffe0' : '#ffe0e0')};
  font-size: 11px;
`;

const InfoBox = styled.div`
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  padding: 12px;
  background: #ffffcc;
  font-size: 10px;
  line-height: 1.5;
`;

export function WaitlistWindow() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !name) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
        setName('');
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError('Error al registrarse. Intenta de nuevo.');
      }
    } catch (err) {
      setError('Error de conexión. Intenta de nuevo.');
    }
  };

  return (
    <Content>
      <Title>📋 WAITLIST NAKAMA</Title>

      {submitted && (
        <Message $type="success">
          ✓ ¡Bienvenido a la familia Nakama! Te hemos agregado a la lista de espera.
        </Message>
      )}

      {error && <Message $type="error">✕ {error}</Message>}

      <FormBox>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="name">Nombre:</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
          />

          <Label htmlFor="email">Email:</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
          />

          <Button type="submit">✓ Registrarme en Waitlist</Button>
        </form>
      </FormBox>

      <InfoBox>
        <strong>¿Por qué unirse?</strong>
        <ul style={{ margin: '8px 0 0 0', paddingLeft: '16px' }}>
          <li>Acceso prioritario a beta</li>
          <li>Beneficios exclusivos para early supporters</li>
          <li>Invitaciones a eventos privados</li>
          <li>Descuentos en donativos</li>
        </ul>
      </InfoBox>
    </Content>
  );
}

