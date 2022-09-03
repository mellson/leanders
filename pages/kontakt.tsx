import { PageBox } from '@/components/PageBox';
import { AspectRatio, Heading } from '@chakra-ui/react';

export default function Kontakt() {
  return (
    <PageBox>
      <Heading size="md">Kontakt</Heading>
      <AspectRatio ratio={16 / 9}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2285.145051056272!2d10.609237416161037!3d55.05819468037333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464d33575c1869ed%3A0x9d61990ca3044745!2sBr%C3%B8dkompagniet!5e0!3m2!1sda!2sdk!4v1648578694806!5m2!1sda!2sdk"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </AspectRatio>
    </PageBox>
  );
}
