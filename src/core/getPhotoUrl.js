import {
  SEM_FOTO,
  TARJA_PRETA,
  TARJA_PRETA_AMARELA,
  TARJA_VERMELHA,
  TARJA_VERMELHA_AMARELA,
  SEM_FOTO_MED,
  TARJA_PRETA_THUMB,
} from '~/assets';

export function getPhotoUrl({ fotos, tarja, principioAtivo, type }) {
  const S3_URL = 'https://app-img.s3-sa-east-1.amazonaws.com';
  let photo = '';

  if (tarja) {
    if (tarja === 'vermelha') {
      photo = TARJA_VERMELHA;
    }

    if (tarja === 'vermelha_amarela') {
      photo = TARJA_VERMELHA_AMARELA;
    }

    if (tarja === 'preta') {
      photo = type === 'thumbnail' ? TARJA_PRETA_THUMB : TARJA_PRETA;
    }

    if (tarja === 'preta_amarela') {
      photo = TARJA_PRETA_AMARELA;
    }
  } else {
    if (fotos && fotos.length) {
      fotos.forEach(foto => {
        if (foto.nomeImagem.indexOf('amazonaws') > 0) {
          photo = { uri: fotos[0].nomeImagem };
        } else {
          if (type === 'thumbnail' && foto.nomeImagem.indexOf('thumb-') > 0) {
            photo = { uri: `${S3_URL}/${foto.nomeImagem}` };
          } else {
            photo = { uri: `${S3_URL}/${foto.nomeImagem.replace('thumb-', '')}` };
          }
        }
      });
    } else {
      if (principioAtivo) {
        photo = SEM_FOTO_MED;
      } else {
        photo = SEM_FOTO;
      }
    }
  }

  return photo;
}
