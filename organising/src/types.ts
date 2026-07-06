/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SectionItem {
  id: string; // e.g., "CIN-412"
  title: string; // e.g., "Cinematography & The Brutal Form"
  category: string; // e.g., "CINEMATIC ARTS :: SEMINAR 02"
  sysId: string; // e.g., "SYS_ID: CIN-412.A.2024"
  dropCap: string; // e.g., "A"
  dropCapText: string; // e.g., "n examination of..."
  quote?: string; // e.g., "The heavy, unyielding architectural spaces..."
  paragraphs: string[];
  leadFaculty: string[];
  requirement: string[];
  location: string;
  bannerImage: string;
}
