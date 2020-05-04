/**
 * Método responsável por verificar a permissão da câmera
 */
export const checkCameraPermission = async () => {
  const possibleStatus = {
    prompt: 'ask',
    denied: 'block',
    granted: 'allow',
  };

  const permission = await navigator.permissions.query({ name: 'camera' });

  return possibleStatus[permission.state] || 'block';
};
